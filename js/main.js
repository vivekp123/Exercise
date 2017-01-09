/**
 * 
 * @author vivekp123
 */

/**
 * Main AngularJS Web Application
 */
var app = angular.module('app', [ 'ngRoute', 'ngMockE2E', 'nvd3', 'ui.bootstrap' ]);

app.config([ '$provide', function($provide) {
  $provide.decorator('$httpBackend', angular.mock.e2e.$httpBackendDecorator);
}]);

app.run(function($httpBackend, mockServerSrvc) {
  
  $httpBackend.whenRoute('GET', '/server-stat/:id').respond(function(method, url, data, headers, params) {
    return [200, mockServerSrvc.getReportData(params)];
  });
  
  //TODO : Need to implement POST method
  /*$httpBackend.whenPOST('/server-stat').respond(function(method, url, data, headers){
    mockServerSrvc.postReportData(params);
    return [200, {}, {}];
  });*/
  
  $httpBackend.whenRoute('GET', '/servers').respond(function(method, url, data, headers){
    return [200, mockServerSrvc.getServerNames()];
  });

  $httpBackend.whenRoute('GET', '/realtime-report/:type').respond(function(method, url, data, headers, params) {
    return [200, mockServerSrvc.getRealtimeData(params)];
  });
  
  $httpBackend.whenRoute('GET', '/singleline-report-types').respond(function(method, url, data, headers, params) {
    return [200, mockServerSrvc.getSinglChartTypes(params)];
  });
  
  $httpBackend.whenRoute('GET', '/multiline-report-types').respond(function(method, url, data, headers, params) {
    return [200, mockServerSrvc.getMultiChartTypes(params)];
  });
});

app.constant('appConstant', {
  'report_title' : 'Time Series Report',
  'live_report_title' : 'Live CPU Usage',
  'memory_usage' : 'Memory Usage',
  'memory_available' : 'Memory Available',
  'cpu_usage' : 'CPU Usage',
  'select_chart_type' : '- Select Chart Type -',
  'select_server' : '- Select Server - ',
  'time_format' : '%H:%M:%S',
  'date_format' : 'MM/dd/yyyy',
  'date_label' : 'Date (MM/dd/yyyy)',
  'time_label' : 'Time (HH:MM:SS)',
  'size_label' : 'Size (KB)',
  'system_errors' : 'System Errors',
  'sensor_errors' : 'Sensor Errors',
  'component_errors' : 'Component Errors'
});