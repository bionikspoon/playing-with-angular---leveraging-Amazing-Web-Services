'use strict';

/**
 * @ngdoc function
 * @name GarageCommerceApp.controller:AppCtrl
 * @description
 * # AppCtrl
 * Controller of the GarageCommerceApp
 */
angular.module('GarageCommerceApp')

  .controller('AppCtrl', function ($scope, Category, Facebook, Auth) {
    $scope.categories = Category.getCategories();
    $scope.user = {};
    $scope.shoppingBasket = [];

    Facebook.getLoginStatus(function (response) {
      if (response.status === 'connected') {
        Auth.getUserInfo()//
          .then(function (data) {
            $scope.user = data;
          });
      } else {
        Facebook.login();
      }
    });
  });
