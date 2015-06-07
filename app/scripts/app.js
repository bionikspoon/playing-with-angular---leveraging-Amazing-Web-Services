'use strict';

/**
 * @ngdoc overview
 * @name GarageCommerceApp
 * @description
 * # GarageCommerceApp
 *
 * Main module of the application.
 */
angular//
  .module('GarageCommerceApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ui.router'
  ])

  .config(function ($stateProvider) {
    $stateProvider.state('add', {
      url: '/add',
      templateUrl: 'views/partials/add-products.html',
      controller: 'AddProductsCtrl'
    });
    $stateProvider.state('category', {
      url: '/:category',
      templateUrl: 'views/partials/products.html',
      controller: 'AddProductsCtrl'
    });
    $stateProvider.state('category.products', {
      url: '/:id',
      templateUrl: 'views/partials/products.details.html',
      controller: 'ProductDetailsCtrl'
    });
  });
