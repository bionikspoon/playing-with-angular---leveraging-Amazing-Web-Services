'use strict';

/**
 * @ngdoc function
 * @name GarageCommerceApp.controller:AppCtrl
 * @description
 * # AppCtrl
 * Controller of the GarageCommerceApp
 */
angular.module('GarageCommerceApp')

  .controller('AppCtrl',
  function ($scope, $log, Category, Facebook, Auth, AWSService) {
    $scope.categories = Category.getCategories();
    $scope.user = {};
    $scope.shoppingBasket = [];

    Facebook.getLoginStatus(function (response) {
      if (response.status === 'connected') {
        Auth.getUserInfo()//
          .then(function (data) {
            $scope.user = data;
          });
      }

      if (response.authResponse) {
        var token = response.authResponse.accessToken;

        AWSService.init(token)//
          .then(function (data) {
            $log.info('app    ', 'data: ', data);
          })//
          .catch(function (error) {
            $log.error('error: ', error);
          });
      }

    });
  });
