'use strict';

/**
 * @ngdoc function
 * @name GarageCommerceApp.controller:AddProductsCtrl
 * @description
 * # AddProductsCtrl
 * Controller of the GarageCommerceApp
 */
angular.module('GarageCommerceApp')

  .controller('AddProductsCtrl',
  function ($scope, $log, Category, Auth, AWSService) {
    $scope.categories = Category.getCategories();

    $scope.newProduct = {};

    $scope.addProduct = function () {
      $scope.newProduct.userId = $scope.user.id;
      $scope.newProduct.userName = $scope.user.name;
      AWSService.saveProductData($scope.newProduct);
      $scope.newProduct = {};
      $scope.uploadedPicUrl = null;
    };
    $scope.uploadImage = function (files) {
      AWSService.uploadPic(files)//
        .then(function (data) {
          $scope.newProduct.picUrl = data;
          $scope.uploadedPicUrl = 'https://s3.amazonaws.com/bionikspoon-garage-commerce/' +
                                  data;

        })//
        .catch(function (error) {
          $log.error('addproducts    ', 'error: ', error);
        });
    };
  });
