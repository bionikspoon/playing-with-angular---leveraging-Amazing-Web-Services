'use strict';

/**
 * @ngdoc directive
 * @name GarageCommerceApp.directive:facebookCheck
 * @description
 * # facebookCheck
 */
angular.module('GarageCommerceApp')

  .directive('facebookCheck', function (Facebook) {

    return {
      templateUrl: 'views/partials/facebook-check.html',
      restrict: 'E',
      link: function postLink(scope) {
        scope.login = function () {
          Facebook.login();
        };
        scope.logout = function () {
          Facebook.logout();
        };
      }
    };
  });
