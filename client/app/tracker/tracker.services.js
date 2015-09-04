'use strict';

var app = angular.module('dLiteMeAdmin')
app.factory('TrackerServices', function ($http, $q, BASE_API_LINK) {
    return {
      getDriversInformation: function(status) {
        var defer = $q.defer()

        $http({
          method: "GET",
          url: BASE_API_LINK.ACTIVE_STAFF,
          data: {status: status}
        }).success(function(data, status, headers, config){
          defer.resolve(data);
        }).error(function(data, status, headers, config){
          defer.resolve(data);
        });
        
        return defer.promise;
      }
    };
  });