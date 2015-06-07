'use strict';

describe('Service: AWS', function () {

  // load the service's module
  beforeEach(module('GarageCommerceApp'));

  // instantiate service
  var AWS;
  beforeEach(inject(function (_AWS_) {
    AWS = _AWS_;
  }));

  it('should do something', function () {
    expect(!!AWS).toBe(true);
  });

});
