import ElectionMapService from './election-map.service';

const MAPPER = new WeakMap();

class ElectionMapDirective {
    constructor(ElectionMapService) {
        MAPPER.set(this, ElectionMapService.factory());

        this.restrict = 'AE';
        this.scope = {
            selectedDistrict: "="
        };
        this.templateUrl = "img/Sejm_RP_okregi.svg";
    }

    static directiveFactory() {
        ElectionMapDirective.instance = new ElectionMapDirective(ElectionMapService);
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

        return function(scope, elem, attrs) {
            scaleImage(attrs.scale);
            elem.find('#layer3').click(function (event) {
                scope.$apply(function() {
                    scope.selectedDistrict.id = MAPPER.get(ElectionMapDirective.instance).getDistrictIdForElections(event.target.id, attrs.electionType);
                });
                elem.find('#layer3 > path').css('fill', '#fff6d5');
                elem.find('#' + event.target.id).css('fill', '#aaf6d5');
            });
        }
    }
}

ElectionMapDirective.directiveFactory.$inject = ['ElectionMapService'];

export default ElectionMapDirective;