/*global alert*/
'use strict';

var check = function (result, errorMessage) {
    if (!result) {
        throw errorMessage;
    }
};

var isInt = function(n) {
    return !isNaN(parseInt(n)) && isFinite(n) && parseInt(n) === n.toString();
};

var getInt = function (elementId, elementName) {
    var element = document.getElementById(elementId);
    if (!isInt(element.value)) {
        throw ('Wartość w polu [' + elementName + '] musi być liczbą całkowitą.');
    }
    return element.value;
};

var isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

function validate() {

    try {
        var pole1 = [];
        var liczbaOsobMeldunek = getInt('liczba_wyborcow', 'Liczba wyborców w obwodzie');
        pole1['1'] = getInt('liczba_1_1', 'Liczba wyborców uprawnionych do głosowania');
        pole1['2'] = getInt('liczba_1_2', 'Komisja otrzymała kart do głosowania');
        pole1['3'] = getInt('liczba_1_3', 'Nie wykorzystano kart do głosowania');
        pole1['4'] = getInt('liczba_1_4', 'Liczba wyborców, którym wydano karty do głosowania');
        pole1['5'] = getInt('liczba_1_5', 'Liczba wyborców głosujących przez pełnomocnika');
        pole1['6'] = getInt('liczba_1_6', 'Liczba wyborców głosujących na podstawie ' +
                                'zaświadczenia o prawie do głosowania');
        pole1['7'] = getInt('liczba_1_7', 'Liczba wyborców, którym wysłano pakiety wyborcze');
        pole1['8'] = getInt('liczba_1_8', 'Liczba otrzymanych kopert zwrotnych');
        pole1['8a'] = getInt('liczba_1_8_a', 'Liczba kopert zwrotnych, w których nie było ' +
            'oświadczenia o osobistym i tajnym oddaniu głosu');
        pole1['8b'] = getInt('liczba_1_8_b', 'Liczba kopert zwrotnych, w których' +
            ' oświadczenie nie było podpisane przez wyborcę');
        pole1['8c'] = getInt('liczba_1_8_c', 'Liczba kopert zwrotnych, w których' +
            ' nie było koperty na kartę do głosowania');
        pole1['8d'] = getInt('liczba_1_8_d', 'Liczba kopert zwrotnych, w których ' +
            'znajdowała się niezaklejona koperta na kartę do głosowania');
        pole1['8e'] = getInt('liczba_1_8_e',
                'Liczba kopert na kartę do głosowania wrzuconych do urny');

        var dopuszczalnyBlad = liczbaOsobMeldunek / 10;
        var roznica = Math.abs(liczbaOsobMeldunek - pole1['1']);

        check(roznica < dopuszczalnyBlad,
                'Liczba wyborców uprawnionych do głosowania jest różna od' +
                ' liczby osób z ostatniego meldunku wyborczego (' +
                    liczbaOsobMeldunek + ') o wiecej niż 10%.');

        var minLiczbaKart = 0.8 * pole1['1'];
        check(pole1['2'] >= minLiczbaKart,
             'Liczba otrzymanych kart do głosowania jest mniejsza, ' +
            'niż 80% liczby wyborów uprawnionych do głosowania.');

        var suma = parseInt(pole1['3']) + parseInt(pole1['4']);

        check(suma === pole1['2'], 'Suma liczb z pkt. 3 i 4 powinna być równa liczbie z pkt. 2.' +
            ' Jeśli tak nie jest, przypuszczalną przyczynę należy opisać w pkt. 15.');

        check(pole1['8'] <= pole1['7'], 'Liczba z pkt. 8 nie może być większa od liczby z pkt. 7.');

        var sumaPole8a8e = parseInt(pole1['8a']) + parseInt(pole1['8b']) + parseInt(pole1['8c']) +
                                parseInt(pole1['8d']) + parseInt(pole1['8e']);

        check(sumaPole8a8e <= parseInt(pole1['8']), 'Suma liczba z pkt. 8a–8e nie ' +
            'może być większa od liczby z pkt. 8');

    } catch (err) {
        alert(err);
        return;
    }

    alert('Jest OK!');
}

