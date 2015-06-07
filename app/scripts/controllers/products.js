'use strict';

/**
 * @ngdoc function
 * @name GarageCommerceApp.controller:ProductsCtrl
 * @description
 * # ProductsCtrl
 * Controller of the GarageCommerceApp
 */
angular.module('GarageCommerceApp')//
  .controller('ProductsCtrl', function ($scope, $stateParams) {
    $scope.category = $stateParams.category;
    $scope.productsListing = [
      {
        product_id: '123', // jshint ignore:line
        title: 'Baby Rattles',
        price: 2,
        userName: 'John Doe'
      },
      {
        product_id: '456', // jshint ignore:line
        title: 'Supercomputer laptop',
        price: 21,
        userName: 'Sandy Peters'
      }
    ];
  });
