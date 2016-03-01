const MAPPER = new WeakMap();
const DISTRICT_SERVICE = new WeakMap();

class ElectionMapDirective {

    constructor(electionMapService, districtDataService) {
        MAPPER.set(this, electionMapService);
        DISTRICT_SERVICE.set(this, districtDataService);

        this.restrict = 'AE';
        this.scope = {
            selectedDistrict: "="
        };
        this.templateUrl = "images/Sejm_RP_okregi.svg";
    }

    static directiveFactory(electionMapService, districtDataService) {
        ElectionMapDirective.instance = new ElectionMapDirective(electionMapService, districtDataService);
        return ElectionMapDirective.instance;
    }

    compile(elem, attrs) {
        function scaleImage(percent) {
            var  svg = elem.find("svg").get(0);
            var w = svg.width.baseVal.value;
            var h = svg.height.baseVal.value;
            svg.setAttribute('viewBox', '0 0 '+w+' '+h);
            svg.setAttribute('width', percent);
            svg.setAttribute('height', percent);
        }

        function rgb(r, g, b){
            return ["rgb(",r,",",g,",",b,")"].join("");
        }

        function prepareItem(id, color, name, percentage) {
            elem.find('#' + id).css('fill', color);
            if (typeof name !== 'undefined' && typeof percentage !== 'undefined') {
                $('#' + id).tooltipster({
                    arrow: false,
                    functionReady: function(){
                        var offset = $(this).offset();
                        $(".tooltipster-base").offset(offset);
                    },
                    content: $('<h5>' + name + '</h5><small>Otrzymanych protokołów: <strong>' + percentage + '%</strong></small>')
                });
            }
        }

        function prepareItems(electionType, shouldSetTooltip) {
            var elections = MAPPER.get(ElectionMapDirective.instance).getDistrictIdsForElections(electionType);
            var districts = DISTRICT_SERVICE.get(ElectionMapDirective.instance).getDistrictDataMap().then(function (data) {
                for (let [key, value] of elections) {
                    if (data.has(value)) {
                        var shade = parseInt(255 - 200 * (data.get(value).peripherals / 100));
                        if (shouldSetTooltip) {
                            prepareItem(key, rgb(0,0,shade), data.get(value).name, data.get(value).peripherals);
                        } else {
                            prepareItem(key, rgb(0,0,shade));
                        }
                    } else {
                        prepareItem(key, '#aaaaff');
                    }
                }
            });
        }

        return function(scope, elem, attrs) {
            scaleImage(attrs.scale);
            prepareItems(attrs.electionType, true);
            elem.find('#layer3').click(function (event) {
                prepareItems(attrs.electionType, false);
                scope.$apply(function() {
                    scope.selectedDistrict.id = MAPPER.get(ElectionMapDirective.instance).getDistrictIdForElections(event.target.id, attrs.electionType);
                });
                elem.find('#' + event.target.id).css('fill', '#888888');
            });
        }
    }
}

ElectionMapDirective.directiveFactory.$inject = ['electionMapService', 'districtDataService'];

export default ElectionMapDirective;