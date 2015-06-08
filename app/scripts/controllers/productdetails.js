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

    AWSService.getProductDetails(id)//
      .then(function (data) {
        $scope.product = data.Item;
        $scope.productPicUrl = 'https://s3.amazonaws.com/bionikspoon-garage-commerce/' +
                               data.Item.picUrl.S;
        $log.debug('productdetails    ', 'data.Item: ', data.Item);
      })//
      .catch(function (error) {
        $log.error('productdetails    ', 'error: ', error);
      });
  });
