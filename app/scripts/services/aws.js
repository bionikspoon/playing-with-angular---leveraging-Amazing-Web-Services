'use strict';

/**
 * @ngdoc service
 * @name GarageCommerceApp.AWSService
 * @description
 * # AWSService
 * Provider in the GarageCommerceApp.
 */
angular.module('GarageCommerceApp')

  .provider('AWSService', function () {


    // Private variables
    var region;
    var S3BucketName;
    var dynamoTableName;
    var roleArn;
    var dynamo;
    var s3bucket;

    // Private constructor
    /**
     *
     * @param $q
     * @param $log
     * @constructor
     */
    function AWSService($q, $log) {
      this.init = function (token) {
        var defer = $q.defer();

        var AWSCredentials = {
          RoleArn: roleArn,
          ProviderId: 'graph.facebook.com',
          WebIdentityToken: token
        };

        AWS.config.credentials = new AWS.WebIdentityCredentials(AWSCredentials);

        defer.resolve(AWS.config.credentials);
        AWS.config.region = region;

        dynamo = new AWS.DynamoDB({
          params: {
            TableName: dynamoTableName
          }
        });
        s3bucket = new AWS.S3({
          params: {
            Bucket: S3BucketName
          }
        });

        return defer.promise;
      };

      this.saveProductData = function (newProduct) {
        if (!dynamo) {
          $log.error('aws    ',
            'AWS not initialized, login required',
            'dynamo: ',
            dynamo);
        }

        var timeStamp = new Date().getTime();
        var UUID = newProduct.userId + '-' + timeStamp;
        var productData = {
          Item: {
            'product_id': {S: UUID},
            category: {S: newProduct.category},
            title: {S: newProduct.title},
            description: {S: newProduct.description},
            price: {S: newProduct.price.toString()},
            picUrl: {S: newProduct.picUrl},
            userId: {S: newProduct.userId},
            userName: {S: newProduct.userName}
          }
        };

        //noinspection JSUnresolvedFunction
        dynamo.putItem(productData, function (error) {
          if (error) {
            $log.error('error: ', error);
          } else {
            $log.info('Product Saved!!');
          }
        });
      };
      this.uploadPic = function (files) {
        if (!dynamo) {
          $log.error('aws    ',
            'AWS not initialized, login required',
            's3bucket: ',
            s3bucket);
        }
        var defer = $q.defer();
        var file = files[0];
        var data = {
          Key: file.name,
          Body: file,
          ContentType: file.type
        };
        s3bucket.putObject(data, function (error, data) {
          var fileName = file.name;
          defer.resolve(fileName);

          if (error) {
            defer.reject(error);
            $log.error('aws    ', 'error: ', error);
          } else {
            $log.info('File Successfully uploaded', data);
          }
        });
        return defer.promise;
      };

      this.getProductsByCategory = function (category) {

        var defer = $q.defer();
        var params = {
          Limit: 100,
          ScanFilter: {
            'category': {
              AttributeValueList: [
                {
                  S: category
                }
              ],
              ComparisonOperator: 'CONTAINS'
            }
          }
        };

        //noinspection JSUnresolvedFunction
        dynamo.scan(params, function (error, data) {
          if (data) {
            defer.resolve(data);
          } else if (error) {
            $log.error('aws    ', 'error: ', error);
          }
        });
        return defer.promise;
      };
    }

    // Public API for configuration

    this.setRoleArn = function (arn) {
      roleArn = arn;
    };
    this.setRegion = function (newRegion) {
      region = newRegion;
    };
    this.setS3Bucket = function (s3) {
      S3BucketName = s3;
    };
    this.setDynamoTableName = function (dynamo) {
      dynamoTableName = dynamo;
    };

    // Method for instantiating
    //noinspection JSUnusedGlobalSymbols
    this.$get = function ($q, $log) {
      return new AWSService($q, $log);
    };
  });
