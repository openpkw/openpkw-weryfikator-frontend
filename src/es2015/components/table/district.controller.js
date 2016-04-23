function districtCtrl(districtDataService, DTOptionsBuilder, DTColumnBuilder) {
    var vm = this;
    vm.dtOptions = DTOptionsBuilder.fromFnPromise(function() {
        return districtDataService.getDistrictDataList();
    }).withBootstrap()
        .withOption('responsive', true)
        .withPaginationType('full_numbers')
        .withLanguage({
            "sEmptyTable":     "Brak danych w tabeli",
            "sInfo":           "Wyświetlam wiersze od _START_ do _END_ spośród _TOTAL_ wierszy",
            "sInfoEmpty":      "Wyświetlam 0 wierszy",
            "sInfoFiltered":   "(filtruję ze _MAX_ wszystkich wierszy)",
            "sInfoPostFix":    "",
            "sInfoThousands":  ",",
            "sLengthMenu":     "Pokaż _MENU_ wierszy",
            "sLoadingRecords": "Ładowanie...",
            "sProcessing":     "Przetwarzanie...",
            "sSearch":         "Szukaj:",
            "sZeroRecords":    "Brak wierszy spełniających kryteria",
            "oPaginate": {
                "sFirst":    "Pierwsza",
                "sLast":     "Ostania",
                "sNext":     "Następna",
                "sPrevious": "Poprzednia"
            },
            "oAria": {
                "sSortAscending":  ": aktywne sortowanie rosnące",
                "sSortDescending": ": aktywne sortowanie malejące"
            }
        });
    vm.dtColumns = [
        DTColumnBuilder.newColumn('number').withTitle('Nr okręgu'),
        DTColumnBuilder.newColumn('name').withTitle('Nazwa Komisji Okręgowej'),
        DTColumnBuilder.newColumn('cities').withTitle('Siedziba Komisji Okręgowej'),
        DTColumnBuilder.newColumn('peripherals').withTitle('Procentowa liczba otrzymanych protokołów')
    ];
}

districtCtrl.$inject = ['districtDataService', 'DTOptionsBuilder', 'DTColumnBuilder'];

export default districtCtrl;