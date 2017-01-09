/**
 * @author vivekp123
 */

app.factory('mockServerSrvc', function() {

  // Mock server data.
  var serverMockData = {
      serverStatList : [],
      singleChartTypes : [ {
        'key' : 'Memory Usage',
        'value' : 'memory_usage'
      }, {
        'key' : 'Memory Available',
        'value' : 'memory_available'
      }, {
        'key' : 'CPU Usage',
        'value' : 'cpu_usage'
      } ],
      multiChartTypes : [{
        'key' : 'All Usage',
        'value' : 'all_usage'
      }, {
        'key' : 'All Errors',
        'value' : 'errors'
      }]
  };
  
  // pseudo code to generate the mock server data
  for (var j = 1; j <= 5; j++) {
    var serverStat = {};
    serverStat.header = {
      "target_name" : 'Server' + j,
      "time_range" : {}
    }
    var dataArray = [];
    var yearcount = 18;
    for (var i = 0; i < yearcount; i++) {
      var year = 2000 + i;
      var timeStamp = new Date('01/07/' + year).getTime();
      if (i === 1) {
        serverStat['header']['time_range']['start'] = timeStamp
      }
      if (i === (yearcount-1)) {
        serverStat['header']['time_range']['end'] = timeStamp
      }
      dataArray.push({
        "timestamp" : timeStamp,
        "memory_usage" : Math.floor((Math.random() * 100) + 1),
        "memory_available" : Math.floor((Math.random() * 1000) + 1),
        "cpu_usage" : Math.floor((Math.random() * 10) + 1),
        "network_throughput" : {
          "in" : Math.floor((Math.random() * 1000) + 1),
          "out" : Math.floor((Math.random() * 100) + 1)
        },
        "network_packet" : {
          "in" : Math.floor((Math.random() * 1000) + 1),
          "out" : Math.floor((Math.random() * 100) + 1)
        },
        "errors" : {
          "system" : Math.floor((Math.random() * 10) + 1),
          "sensor" : Math.floor((Math.random() * 10) + 1),
          "component" : Math.floor((Math.random() * 10) + 1)
        }
      });
    }
    serverStat['data'] = dataArray;
    serverMockData.serverStatList.push(serverStat);
  }

  return {
    
    getReportData : function(params) {
      var serverData = _.find(serverMockData.serverStatList, function(o) {
        return (o.header.target_name === params.id)
      });
      var filtersArray = _.filter(serverData.data, function(s){
        return  (s.timestamp >= params.from && params.to >= s.timestamp);
      });
      return filtersArray;
    },

    getSinglChartTypes : function(){
      return serverMockData.singleChartTypes;
    },
    
    getMultiChartTypes : function(){
      return serverMockData.multiChartTypes;
    },
    
    getServerNames : function(){
      var serverData = _.map(serverMockData.serverStatList, 'header.target_name');
      return serverData;
    },
    
    getRealtimeData : function(params) {
      return {
        data : Math.floor((Math.random() * 10) + 1),
        time : new Date().getTime()
      }
    }
  }

});