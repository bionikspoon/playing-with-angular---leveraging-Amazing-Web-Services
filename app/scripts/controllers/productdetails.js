'use strict';

/**
 * @ngdoc function
 * @name GarageCommerceApp.controller:ProductDetailsCtrl
 * @description
 * # ProductDetailsCtrl
 * Controller of the GarageCommerceApp
 */
angular.module('GarageCommerceApp').controller('ProductDetailsCtrl',
  function ($scope, $stateParams, $log, AWSService) {
    var id = $stateParams.id;
    $scope.productPicUrl = null;
    $scope.product = {};
    $scope.shoppingBasket = [];

    $scope.addToCart = function (id) {
      $scope.shoppingBasket.push(id);
    };

    AWSService.getProductDetails(id)//
      .then(function (data) {
        $scope.product = data.Item;
        $scope.productPicUrl = 'https://s3.amazonaws.com/bionikspoon-garage-commerce/' +
                               data.Item.picUrl.S;
      })//
      .catch(function (error) {
        $log.error('productdetails    ', 'error: ', error);
      });

  });
