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
    }

    // Public API for configuration
    /*this.setSalutation = function (s) {
     salutation = s;
     };*/
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
    this.$get = function ($q, $log) {
      return new AWSService($q, $log);
    };
  });
