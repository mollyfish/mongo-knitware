require(__dirname + '/../../app/js/entry');
require('angular-mocks');

describe('sweaters controller', function() {
  var $httpBackend;
  var $ControllerConstructor;
  var $scope;

  beforeEach(angular.mock.module('SweaterStreamApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $ControllerConstructor = $controller;
  }));

  it('should be able to create a controller', function() {
    var controller = $ControllerConstructor('SweatersController', {$scope: $scope});
    expect(typeof $scope).toBe('object');
    expect(typeof controller).toBe('object');
    expect(Array.isArray($scope.sweaters)).toBe(true);
  });

  describe('REST request functions', function() {
    beforeEach(angular.mock.inject(function(_$httpBackend_, $rootScope) {
      $httpBackend = _$httpBackend_;
      $scope = $rootScope.$new();
      $ControllerConstructor('SweatersController', {$scope: $scope});
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should add an array to sweaters with a GET all', function() {
      $httpBackend.expectGET('/api/sweaters').respond(200, [{_id: 1, name: 'test sweater'}]);
      $scope.getAll();
      $httpBackend.flush();
      expect($scope.sweaters[0].name).toBe('test sweater');
    });

    it('should be able to create a new sweater', function() {
      $httpBackend.expectPOST('/api/sweaters', {name: 'test sweater', fishPreference: 'Salmons', flavor: "grizzly"}).respond(200, {name: 'a different sweater'});
      expect($scope.sweaters.length).toBe(0);
      expect($scope.newSweater).toEqual($scope.defaults);      
      $scope.newSweater.name = 'test sweater';
      $scope.create($scope.newSweater);
      $httpBackend.flush();
      expect($scope.sweaters[0].name).toBe('a different sweater');
      expect($scope.newSweater).toEqual($scope.defaults);
    });
  });
});
