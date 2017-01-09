/**
 * @author vivekp123
 */


app.factory('reportSrvc', function($http, appConstant) {
  var reportBuilder = {};

  /**
   * API to get report data for given server id and time range
   * @method getReportData
   * @param {} serverId
   * @param {} startTime
   * @param {} endTime
   * @return CallExpression
   */
  reportBuilder.getReportData = function(serverId, startTime, endTime) {
    var url = '/server-stat/' + serverId + '/?';
    url = url + 'from=' + startTime.getTime() + '&to=' + endTime.getTime();
    return $http.get(url);
  };

  /**
   * API to get all server names
   * @method getServerNames
   * @return CallExpression
   */
  reportBuilder.getServerNames = function() {
    return $http.get('/servers');
  };
  
  /**
   * API to get real time CPU data
   * @method getCUPRealtimeData
   * @return CallExpression
   */
  reportBuilder.getCUPRealtimeData = function() {
    return $http.get('/realtime-report/cpu');
  };
  
  /**
   * API to get list of chart types for single line report
   * @method getSingleLineChartTypes
   * @return CallExpression
   */
  reportBuilder.getSingleLineChartTypes = function(){
    return $http.get('/singleline-report-types');
  };
  
  /**
   * API to get list of chart types for multi line report
   * @method getMultiLineChartTypes
   * @return CallExpression
   */
  reportBuilder.getMultiLineChartTypes = function(){
    return $http.get('/multiline-report-types');
  };
  
  /**
   * Parse & Build report data 
   * @method getAllUsageReportData
   * @param {} response
   * @return ArrayExpression
   */
  reportBuilder.getAllUsageReportData = function(response){
    var mulist = _.map(response, function(obj) {return {data : obj['memory_usage'],timestamp : obj.timestamp}});
    var malist = _.map(response, function(obj) {return {data : obj['memory_available'],timestamp : obj.timestamp}});
    var culist = _.map(response, function(obj) {return {data : obj['cpu_usage'],timestamp : obj.timestamp}});
    
    return [ {
      values : mulist,
      key : appConstant['memory_usage'],
    },{
      values : malist,
      key : appConstant['memory_available'],
    },{
      values : culist,
      key : appConstant['cpu_usage'],
    }];
  };

  /**
   * Parse & Build report data
   * @method getAllErrorReportData
   * @param {} response
   * @return ArrayExpression
   */
  reportBuilder.getAllErrorReportData = function(response){
    var mulist = _.map(response, function(obj) {return {data : obj['errors']['system'],timestamp : obj.timestamp}});
    var malist = _.map(response, function(obj) {return {data : obj['errors']['sensor'],timestamp : obj.timestamp}});
    var culist = _.map(response, function(obj) {return {data : obj['errors']['component'],timestamp : obj.timestamp}});
    
    return [ {
      values : mulist,
      key : appConstant['system_errors'],
    },{
      values : malist,
      key : appConstant['sensor_errors'],
    },{
      values : culist,
      key : appConstant['component_errors'],
    }];
  };
  
  return reportBuilder;
});