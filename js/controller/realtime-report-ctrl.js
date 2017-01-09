/**
 * @author vivekp123
 */

app.controller('RealtimeReportCtrl', [ '$scope', 'reportSrvc', 'appConstant', function($scope, reportSrvc, appConstant) {

  $scope.run = true; // Init variable to toggle realtime report generation
  var interval = 1000 // Interval variable. Can be configured from UI by
                      // attaching to scope

  // D3 Real time chart configuration options
  $scope.realtimeChartOptions = {
    chart : {
      type : 'lineChart',
      height : 300,
      width : 690,
      margin : {
        top : 20,
        right : 20,
        bottom : 40,
        left : 55
      },
      x : function(d) {
        return d.time;
      },
      y : function(d) {
        return d.data;
      },
      useInteractiveGuideline : true,
      duration : 500,
      xAxis : {
        axisLabel : appConstant.time_label,
        tickFormat : function(d) {
          return d3.time.format(appConstant.time_format)(new Date(d))
        },
        showMaxMin : true
      },
      yAxis : {
        axisLabel : appConstant.cpu_usage,
        axisLabelDistance : -10
      }
    },
    title : {
      enable : true,
      text : appConstant.live_report_title
    }
  };

  // D3 Real time chart configuration data
  $scope.realtimeChartData = [ {
    values : [],
    key : appConstant.cpu_usage
  } ];

  // Time interval to fetct the data
  setInterval(function() {
    if (!$scope.run) {
      return;
    }

    reportSrvc.getCUPRealtimeData().success(function(response) {
      $scope.realtimeChartData[0].values.push(response)
    });

    if ($scope.realtimeChartData[0].values.length > 20) {
      $scope.realtimeChartData[0].values.shift();
    }

    $scope.$apply();
  }, interval);

} ]);