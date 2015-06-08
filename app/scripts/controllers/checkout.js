'use strict';

/**
 * @ngdoc function
 * @name GarageCommerceApp.controller:CheckoutCtrl
 * @description
 * # CheckoutCtrl
 * Controller of the GarageCommerceApp
 */
angular.module('GarageCommerceApp')

  .controller('CheckoutCtrl', function ($scope, $log, AWSService) {
    $scope.totalPrice = 0;
    $scope.checkoutList = [];

    $scope.placeOrder = function () {
      AWSService.saveOrder($scope.checkoutList, $scope.user.id);
    };

    angular.forEach($scope.shoppingBasket, function (item) {
      AWSService.getProductDetails(item)//
        .then(function (data) {
          var basketItem = {};
          basketItem.title = data.Item.title.S;
          basketItem.price = data.Item.price.S;

          $scope.totalPrice += parseInt(basketItem.price);
          $scope.checkoutList.push(basketItem);
        })//
        .catch(function (error) {
          $log.error('checkout    ', 'error: ', error);
        });
    });
  });
