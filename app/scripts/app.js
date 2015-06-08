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
    'ui.router',
    'facebook'
  ])

  .config(function ($stateProvider) {
    $stateProvider.state('add', {
      url: '/add',
      templateUrl: 'views/partials/add-products.html',
      controller: 'AddProductsCtrl'
    });
    $stateProvider.state('checkout', {
      url: '/checkout',
      templateUrl: 'views/partials/checkout.html',
      controller: 'CheckoutCtrl'
    });
    $stateProvider.state('category', {
      url: '/:category',
      templateUrl: 'views/partials/products.html',
      controller: 'ProductsCtrl',
      resolve: {
        Facebook: 'Facebook',
        FBToken: function (Facebook) {
          return Facebook.getLoginStatus(function (response) {
            if (response.status === 'connected') {
              return response.token;
            }
          });
        },
        AWSinit: function (FBToken, AWSService) {
          var token = FBToken.authResponse.accessToken;
          return AWSService.init(token).$promise;

        }
      }
    });
    $stateProvider.state('category.products', {
      url: '/:id',
      templateUrl: 'views/partials/products.details.html',
      controller: 'ProductDetailsCtrl'
    });

  })

  .config(function (FacebookProvider) {
    FacebookProvider.init('1579822162291570');
  })

  .config(function (AWSServiceProvider) {
    AWSServiceProvider.setRoleArn('arn:aws:iam::473550578587:role/garageCommerceUser');
    AWSServiceProvider.setRegion('us-east-1');
    AWSServiceProvider.setS3Bucket('bionikspoon-garage-commerce');
    AWSServiceProvider.setDynamoTableName('garage-commerce');
  });
