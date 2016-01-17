(function() {
    'use strict';
    angular.module('app.calc')
    .controller('CalcController', CalcController);

    CalcController.$inject = ['CalcService', 'CalcPdfGeneratorService', 'FormMock',
                                'ValidationMessagesService', '$window', '$scope'];

    function CalcController(CalcService, CalcPdfGeneratorService, FormMock,
                            ValidationMessagesService, $window, $scope) {
        var vm = this;
        vm.printPdf = printPdf;
        vm.selectFirstVoivodship = selectFirstVoivodship;
        vm.selectFirstDistrict = selectFirstDistrict;
        vm.selectFirstCommunity = selectFirstCommunity;
        vm.selectFirstPollingStation = selectFirstPollingStation;
        vm.addEmptyCommissionMember = addEmptyCommissionMember;
        vm.loadMockFormData = loadMockFormData;
        vm.removeCommissionMember = removeCommissionMember;
        vm.commissionMemberRoles = [];

        vm.getHardErrorMessages = getHardErrorMessages;
        vm.hardErrorsExist = hardErrorsExist;
        vm.voivodship = null;
        vm.district = null;
        vm.geographyTaxonomy = null;
        vm.candidates = null;
        vm.pollingStationsData = null;
        vm.pollingStation = null;
        /*calc formData begin*/
        vm.formData = {};
        vm.formData.komisja = {};
        vm.formData.akcjaWyborcza = {};
        vm.formData.rozliczenieKart = {};
        vm.formData.uwagiIAdnotacje = {};
        vm.formData.wynikiGlosowania = {};
        vm.formData.czlonkowieKomisji = [];
        /*calc formData end*/
        initialize();

        function printPdf() {
            vm.request = {templateName:'PdfTemplate', formData:vm.formData};
            CalcPdfGeneratorService.generatePdf(vm.request);
        }

        function selectFirstVoivodship() {
            var voivodship = vm.geographyTaxonomy[0];
            vm.voivodship = angular.isUndefined(voivodship) ? null : voivodship;
            vm.selectFirstDistrict();
        }

        function selectFirstDistrict() {
            var district = vm.voivodship.children[0];
            vm.district = angular.isUndefined(district) ? null : district;
            vm.selectFirstCommunity();
        }

        function selectFirstCommunity() {
            var community = vm.district.children[0];
            vm.community = angular.isUndefined(community) ? null : community;
            vm.selectFirstPollingStation();
        }

        function selectFirstPollingStation() {
            var poolingStation = vm.pollingStationsData[0];
            vm.formData.komisja = angular.isUndefined(poolingStation) ? null : poolingStation;
        }

        function initialize() {
            vm.commissionMemberRoles = ['', 'Członek',
                        'Zastępca Przewodniczącego', 'Przewodniczący'];
            loadPoolingStationsData()
                .then(loadGeographyTaxonomy()
                    .then(console.log('finish initialize data of CalcController')));

        }

        function loadGeographyTaxonomy() {
            return CalcService.getGeographyTaxonomy().then(function(response) {
                vm.geographyTaxonomy = response.data;
                vm.selectFirstVoivodship();
                vm.selectFirstDistrict();
                vm.selectFirstCommunity();
            });
        }

        function loadPoolingStationsData() {
            return CalcService.loadPollingStationsData().then(function(data) {
                vm.pollingStationsData = data.pollingStationsData;
                vm.candidates = data.candidates;
                vm.selectFirstPollingStation();
            });
        }

        function addEmptyCommissionMember() {
            vm.formData.czlonkowieKomisji.push({imie1:'', imie2:'', nazwisko:'', funkcja:'',
                obecnosc:''});
        }

        function loadMockFormData() {
            FormMock.getExampleData().then(function(response) {vm.formData = response.data;
                console.log(response.data);});
        }
        function removeCommissionMember(index) {
            console.log(vm.formData.czlonkowieKomisji[index]);
            var member = vm.formData.czlonkowieKomisji[index];
            var confirmMessage = 'Czy na pewno chcesz usunąć wybranego członka: ' +
                member.imie1 + ' ' + member.imie2 + ' ' + member.nazwisko;
            if ($window.confirm(confirmMessage)) {
                vm.formData.czlonkowieKomisji.splice(index, 1);
            }
        }
        function getHardErrorMessages() {
            return ValidationMessagesService.getHardErrors();
        }
        function hardErrorsExist() {
            return ValidationMessagesService.hardErrorsExist();
        }
    }
})();
