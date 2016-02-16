export default function candidatesCtrl(DTOptionsBuilder, DTColumnBuilder) {
    'ngInject';
    var vm = this;
    vm.dtOptions = DTOptionsBuilder.fromSource('data.json').withBootstrap()
        .withPaginationType('full_numbers')
        .withLanguage({
            "sEmptyTable":     "Brak danych w tabeli",
            "sInfo":           "Wyświetlam _START_ do _END_ z _TOTAL_ rekordów",
            "sInfoEmpty":      "Wyświetlam 0 do 0 z 0 rekordów",
            "sInfoFiltered":   "(filtruje ze _MAX_ wszystkich rekordów)",
            "sInfoPostFix":    "",
            "sInfoThousands":  ",",
            "sLengthMenu":     "Pokaz _MENU_ rekordy",
            "sLoadingRecords": "Ładowanie...",
            "sProcessing":     "Przetwarzanie...",
            "sSearch":         "Szukaj:",
            "sZeroRecords":    "Brak rekordów spełniających kryteria",
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
        DTColumnBuilder.newColumn('name').withTitle('Nazwa Komitetu Wyborczego'),
        DTColumnBuilder.newColumn('number').withTitle('Nr na liscie'),
        DTColumnBuilder.newColumn('candidate').withTitle('Imie i Nazwisko'),
        DTColumnBuilder.newColumn('votesGet').withTitle('Ilość zdobytych głosów'),
        DTColumnBuilder.newColumn('percents').withTitle('Procent'),
        DTColumnBuilder.newColumn('getMandate').withTitle('Dostał Mandat')
    ];
}