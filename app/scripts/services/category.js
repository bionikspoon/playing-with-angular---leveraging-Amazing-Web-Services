'use strict';

/**
 * @ngdoc service
 * @name GarageCommerceApp.Category
 * @description
 * # Category
 * Factory in the GarageCommerceApp.
 */
angular.module('GarageCommerceApp')

  .factory('Category', function () {
    var category = {};
    category.getCategories = function () {
      var categories = [
        'Toys',
        'Electronics',
        'Books',
        'Furniture',
        'Collectibles'
      ];
      return categories;
    };

    return category;

  });
