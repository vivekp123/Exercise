/**
 * @author vivekp123
 */

app.controller('LineReportCtrl', [ '$scope', 'reportSrvc', 'appConstant', function($scope, reportSrvc, appConstant) {

  $scope.format = appConstant.date_format;

  $scope.startDateOptions = {
    maxDate : new Date()
  };
  
  reportSrvc.getSingleLineChartTypes().success(function(response) {
    $scope.chartTypes = response;
  });

  reportSrvc.getMultiLineChartTypes().success(function(response) {
    $scope.multiChartTypes = response;
  });
  
  reportSrvc.getServerNames().success(function(response) {
    $scope.reportList = response;
  });

  /**
   * Callback function of Server Dropdown change 
   * @method severSelection
   * @param {} name
   * @return 
   */
  $scope.severSelection = function(name) {
    $scope.selectedServer = name;
  }

  /**
   * Callback function of Chart type Dropdown change 
   * @method chartSelectionChange
   * @param {} name
   * @return 
   */
  $scope.chartSelectionChange = function(name) {
    $scope.selectedChart = name;
  }

  /**
   * Callback function of start date change
   * @method changeMinAndMaxDates
   * @return 
   */
  $scope.changeFromMinAndMaxDates = function() {
    $scope.endDateOptions = {
      minDate : new Date($scope.fromDate)
    };
  };

  /**
   * Callback function of end date change
   * @method changeToMinAndMaxDates
   * @return 
   */
  $scope.changeToMinAndMaxDates = function() {
    $scope.startDateOptions = {
      maxDate : new Date($scope.toDate)
    };
  };

  /*
   * D3 chart config object 
   */
  $scope.lineChartOptions = {
    chart : {
      type : 'lineChart',
      height : 350,
      width : 700,
      margin : {
        top : 100,
        right : 20,
        bottom : 40,
        left : 55
      },
      x : function(d) {
        return d.timestamp;
      },
      y : function(d) {
        return d.data;
      },

      xAxis : {
        axisLabel : appConstant.date_label,
        tickFormat : function(d) {
          return d3.time.format('%x')(new Date(d))
        },
        showMaxMin : true
      },
      yAxis : {
        axisLabel : appConstant.size_label,
        showMaxMin : true,
        axisLabelDistance : -10
      },
      useInteractiveGuideline : true
    },
    title : {
      enable : true,
      text : appConstant.report_title
    }
  };

  /**
   * Generate chart based on server, chart type & date selection
   * @method printReport
   * @return 
   */
  $scope.printReport = function() {
    if (!$scope.selectedServer || !$scope.selectedChart || !$scope.selectedChart.value || !$scope.fromDate || !$scope.toDate) {
      return;
    }

    var chartType = $scope.selectedChart.value;

    reportSrvc.getReportData($scope.selectedServer, $scope.fromDate, $scope.toDate).success(function(response) {

      if (chartType === 'all_usage') {
        $scope.lineChartData = reportSrvc.getAllUsageReportData(response);
        return;
      } else if (chartType === 'errors') {
        $scope.lineChartData = reportSrvc.getAllErrorReportData(response);
        return;
      }

      var list = _.map(response, function(obj) {
        return {
          data : obj[chartType],
          timestamp : obj.timestamp
        }
      });

      $scope.lineChartData = [ {
        values : list,
        key : appConstant[chartType],
      } ];
    });
  };

}]);