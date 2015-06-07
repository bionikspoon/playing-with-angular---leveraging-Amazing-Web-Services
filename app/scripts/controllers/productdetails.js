'use strict';

/**
 * @ngdoc function
 * @name GarageCommerceApp.controller:ProductDetailsCtrl
 * @description
 * # ProductDetailsCtrl
 * Controller of the GarageCommerceApp
 */
angular.module('GarageCommerceApp')
  .controller('ProductDetailsCtrl', function ($scope, $stateParams) {
    $scope.id = $stateParams.id;

    $scope.product = {
      title: 'Supercomputer laptop',
      price: 21,
      userName: 'Sandy Peters'
    };
  });
