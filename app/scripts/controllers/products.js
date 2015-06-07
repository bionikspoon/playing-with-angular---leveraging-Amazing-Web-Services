'use strict';

/**
 * @ngdoc function
 * @name GarageCommerceApp.controller:ProductsCtrl
 * @description
 * # ProductsCtrl
 * Controller of the GarageCommerceApp
 */
angular.module('GarageCommerceApp')//
  .controller('ProductsCtrl',
  function ($scope, $stateParams, $log, AWSService) {
    $scope.category = $stateParams.category;
    $scope.productsListing = [];

    AWSService.getProductsByCategory($scope.category)//
      .then(function (data) {
        $scope.productsListing = data.Items;
      });
  });
