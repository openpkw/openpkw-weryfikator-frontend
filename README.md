# OpenPKW Weryfikator Frontend

Celem komponentu jest prezentacja danych przechowywanych przez OpenPKW Weryfikator Backend, czyli wyników wyborów.
 
![OpenPKW Weryfikator Components](https://raw.githubusercontent.com/openpkw/openpkw-devops/master/OpenPKW%20Weryfikator%20Components.png)

## Najważniejsze linki
| Element  | Link  |
| ------------- | ------------- |
| Lista zadań | https://trello.com/b/eX0kOIwp/openpkw-java|
| Repozytorium kodu źródłowego  |  https://github.com/openpkw/openpkw-weryfikator-frontend|
| Serwer Continuous Delivery | http://cypisek.open-pkw.pl:8080/view/OpenPKW%20Weryfikator%20Frontend/ |
| Środowisko TEST | http://rumcajs.openpkw.pl:81 |
| Środowisko UAT | http://dobromir.openpkw.pl:81 |
| Środowisko STAGE | (jeszcze nie ma) |
| Środowisko PROD | (jeszcze nie ma) |

## Technologia

- AngularJS
- npm
- grunt
- bower

## Instrukcja instalacji i uruchamiania

- Ściągamy i instalujemy [git'a](http://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- Ściągamy i instalujemy [nodejs](https://nodejs.org/download/)
- Ściągamy i instalujemy g++
- W katalogu gdzie zainstalowany jest node uruchamiamy:<br/>
```npm install -g npm ```<br/>
```npm install -g grunt-cli```<br/>
```npm install -g bower```<br/>
- Ściągamy projekt kalkulatora ```git clone https://github.com/openpkw/openpkw-weryfikator-frontend.git```
- W katalogu */src/frontend* możemy uruchomić następujące taski:<br/>
 ```npm install``` - instaluje wszystkie zależności wymagane w projekcie<br/>
 ```npm run build``` - buduje wersję produkcyjną aplikacji<br/>
 ```npm run server-prod``` - startuje serwer produkcyjny [http://localhost:8089](http://localhost:8089), może być również używany przez osoby chcące tylko pooglądać aplikację<br/>
 ```npm run server-dev``` - serwer deweloperski [http://localhost:9000](http://localhost:9000), obsługuje livereload (przeglądarka sama się odświeża gdy edytujemy i zapisujemy pliki), uruchamia się szybciej niż. Przed uruchomieniem nie trzeba budować aplikacji ponieważ serwer działa na plikach z katalogu ```src``<br/>
- Konfiguracja proxy. Frontend łączy się z backendem w celu pobrania danych do wyświetlenia. Backend zainstalowany może być na innym serwerze, więc w celu unikniecia komunikacji cross-site stosujemy proxy. Na serwerach OpenPKW proxy realizowane jest przez moduł mod_proxy serwera webowego Apache. Na maszynach deweloperskich proxy realizowane jest przez serwer node.js. Konfiguracja proxy w node.js znajduje się w pliku Gruntfile.js. Adres serwera backendowego jest w zmiennej config.backendProxy, a pozostała konfiguracja w sekcji proxies.
