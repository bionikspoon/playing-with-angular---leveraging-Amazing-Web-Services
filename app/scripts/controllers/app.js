'use strict';

/**
 * @ngdoc function
 * @name GarageCommerceApp.controller:AppCtrl
 * @description
 * # AppCtrl
 * Controller of the GarageCommerceApp
 */
angular.module('GarageCommerceApp')

  .controller('AppCtrl', function ($scope, Category) {
    $scope.categories = Category.getCategories();
    $scope.user = {};
    $scope.shoppingBasket = [];
  });
