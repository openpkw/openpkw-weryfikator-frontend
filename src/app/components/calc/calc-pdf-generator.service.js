(function() {
    'use strict';
    angular
        .module('app.calc')
        .service('CalcPdfGeneratorService', ['$http', '$window', CalcPdfGeneratorService]);

    function CalcPdfGeneratorService($http, $window) {

        this.generatePdf = function(pdfData) {
            console.log(pdfData);
            this.sendFormData(pdfData)
                .then(this.openPdfWindow, this.getPdfDataFromServerError);
        };

        this.getPdfDataFromServerError = function(response) {
            console.error('Nie udało się wygenerować pdf');
            console.error(response);
        };

        this.openPdfWindow = function(response) {
            var blob = new Blob([response.data], {
                type: 'application/pdf'
            });
            var url = URL.createObjectURL(blob);
            $window.open(url);
        };

        this.sendFormData = function(formData) {
            return $http.post('/openpkw-dokument-generator/service/protocol', formData, {
                headers: {
                    'Content-Type': 'application/json'
                },
                responseType: 'arraybuffer'
            });
        };
    }
})();
