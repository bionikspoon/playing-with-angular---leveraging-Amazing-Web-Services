'use strict';

/**
 * @ngdoc function
 * @name GarageCommerceApp.controller:AddProductsCtrl
 * @description
 * # AddProductsCtrl
 * Controller of the GarageCommerceApp
 */
angular.module('GarageCommerceApp')//
  .controller('AddProductsCtrl', function ($scope, Category, Auth, AWSService) {
    $scope.categories = Category.getCategories();

    $scope.newProduct = {};

    $scope.addProduct = function () {
      $scope.newProduct.userId = $scope.user.id;
      $scope.newProduct.userName = $scope.user.name;
      $scope.newProduct.picUrl = 'sw3/somUrl';
      AWSService.saveProductData($scope.newProduct);
    };
  });
