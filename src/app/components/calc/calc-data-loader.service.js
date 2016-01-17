(function() {
    'use strict';
    angular
        .module('app.calc')
        .service('CalcDataLoader', CalcDataLoader);

    function CalcDataLoader() {

        var service = {
            loadCandidates: loadCandidates,
            loadPollingStationsData: loadPollingStationsData,
            loadPollingStationData : loadPollingStationData
        };

        return service;

        function loadCandidates(xmlDoc) {
            var result = [];
            var candidateElements = $(xmlDoc).find('kandydat');
            candidateElements.each(function(index) {
                result.push({
                    positionOnList : parseInt($(this).attr('kdtNumerNaKarcie')),
                    firstName : $(this).find('imiona')[0].innerHTML,
                    lastName : $(this).find('nazwisko')[0].innerHTML
                });
            });
            return result;
        }

        function loadPollingStationsData(xmlDoc) {
            if (typeof(xmlDoc) === 'string') {
                xmlDoc = $.parseXML(xmlDoc);
            }

            var numberOfPollingStations = getNumberOfNodes(xmlDoc,
                'count(/kalkulator/akcja/jednostka/jednostka/jednostka/obwod)');
            var result = [];
            for (var idx = 0; idx < numberOfPollingStations; idx++) {
                var pollingStationData = loadPollingStationData(xmlDoc, idx + 1);
                result[idx] = pollingStationData;
            }

            return result;
        }

        function loadPollingStationData(xmlDoc, idx) {
            var result = [];

            var xml = xmlDoc;
            var kodGminy = getAttribute(xml, '/kalkulator/akcja/jednostka/' +
                'jednostka/jednostka/@jnsKod');
            var nrObwodu = getAttribute(xml, '/kalkulator/akcja/jednostka/jednostka' +
                '/jednostka/obwod[' + idx + ']/@obdNumer');
            var siedzibaKomisjiObwodowej = getAttribute(xml, '/kalkulator/akcja' +
                '/jednostka/jednostka/jednostka/obwod[' + idx + ']/obdAdres');
            var gmina = getAttribute(xml, '/kalkulator/akcja/jednostka' +
                '/jednostka/jednostka/jnsNazwa');
            var powiat = '?';
            var wojewodztwo = getAttribute(xml,
                '/kalkulator/akcja/jednostka/jednostka/jnsNazwa');
            var numerKomisjiOkregowej = getAttribute(xml, '/kalkulator/akcja' +
                '/jednostka/jednostka/jednostka/organWyborczy/slownik/wpis[@typ=\'NUMER\']');
            var siedzibaKomisjiOkregowej = getAttribute(xml, '/kalkulator/akcja' +
                '/jednostka/jednostka/jednostka/organWyborczy/slownik/' +
                'wpis[@typ=\'MIEJSCOWNIK_W\']');
            var liczbaWyborcow = getAttribute(xml, '/kalkulator/akcja/' +
                'jednostka/jednostka/jednostka/obwod[' + idx + ']/obwodPzt/@oodLiczbaWyborcow');

            return {
                kodGminy : kodGminy,
                nrObwodu : nrObwodu,
                siedzibaKomisjiObwodowej : siedzibaKomisjiObwodowej,
                gmina : gmina,
                powiat : powiat,
                wojewodztwo : wojewodztwo,
                numerKomisjiOkregowej : numerKomisjiOkregowej,
                siedzibaKomisjiOkregowej : siedzibaKomisjiOkregowej,
                liczbaWyborcow : liczbaWyborcow
            };
        }
        function getAttribute(document, path) {
            return document.evaluate(path, document, null, XPathResult.ANY_TYPE, null)
                .iterateNext()
                .textContent;
        }
        function getNumberOfNodes(document, path) {
            return document.evaluate(path, document, null, XPathResult.ANY_TYPE, null)
                .numberValue;
        }
    }
})();
