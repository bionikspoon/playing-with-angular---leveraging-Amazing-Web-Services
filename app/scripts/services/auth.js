'use strict';

/**
 * @ngdoc service
 * @name GarageCommerceApp.Auth
 * @description
 * # Auth
 * Factory in the GarageCommerceApp.
 */
angular.module('GarageCommerceApp')

  .factory('Auth', function ($q, Facebook) {
    var auth = {};
    auth.getUserInfo = function () {
      var defer = $q.defer();
      Facebook.api('/me', function (response) {
        defer.resolve(response);
      });
      return defer.promise;
    };

    return auth;
  });
