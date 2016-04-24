function districtChartCtrl(districtChartDataService, DTOptionsBuilder, DTColumnBuilder, $rootScope) {

    this.districtEvents = {
        draw: (data) => {
            if (data.type === 'label' && data.text.indexOf(' %') === -1) {
                // this is weird, but I have no idea how to implement it in a smart way
                var offsetToMakeTextCentered = 0;
                if (data.text.indexOf(' ') === -1) {
                    offsetToMakeTextCentered = -12;
                }
                // adjust label position for rotation
                const dX = data.width * 0.9 + (100 - data.width) + offsetToMakeTextCentered;
                data.element.attr({ x: data.element.attr('x') - dX })
            }
            if(data.type === 'bar') {
                data.element.attr({
                    style: 'stroke-width: 40px; stroke: #339933'
                });
            }
        }
    };

    $rootScope.$watch('district.id', (districtId) => {
        districtChartDataService.loadPollingData(districtId);
        districtChartDataService.getGeneralResults().then(
            data => {
                this.districtGeneralResults = data.chart;
                this.districtOptions = {
                    high: data.max + 1,
                    low: 0,
                    axisY: {
                        offset: 80,
                        labelInterpolationFnc: (value) => value.toFixed(0) + ' %',
                        scaleMinSpace: 50
                    }
                };
            }
        );

        districtChartDataService.getProtocolCount().then(
            data => this.districtProtocolCount = data.chart
        );

        districtChartDataService.getTurnoutData().then(
            data => this.districtTurnoutData = data.chart
        );

    });
}

districtChartCtrl.$inject = ['districtChartDataService', 'DTOptionsBuilder', 'DTColumnBuilder', '$rootScope'];

export default districtChartCtrl;