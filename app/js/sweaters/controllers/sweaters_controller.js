var angular = window.angular;
module.exports = function(app) {
  app.controller('SweatersController', ['$scope', '$http', 'cfResource', '$location', function($scope, $http, cfResource, $location) {
    $scope.sweaters = [];
    $scope.errors = [];
    $scope.sweaterDefaults = {name: 'New Sweater', knitter: '', knitterId: '', wearer: 'a friend', size: 'WM', style: {direction: 'topDown', neck: 'crew', shoulders: 'yoke', sleeveLength: 'full', shaping: 'noShape', length: 'hip'}};
    $scope.newSweater = angular.copy($scope.sweaterDefaults);
    $scope.messageOne = "hello from inside the controller";
    var sweatersResource = cfResource('sweaters');

    if (!$scope.token) {
      $location.path('/signup');
    }

    $scope.getAll = function() {
      console.log('hello from bundle.js');
      sweatersResource.getAll(function(err, data) {
        if (err) return err;

        $scope.sweaters = data;
      });
    };

    $scope.create = function(sweater) {
      sweatersResource.create(sweater, function(err, data){
        if (err) return err;
        $scope.sweaters.push(data);
        $scope.newSweater = angular.copy($scope.sweaterDefaults); 
      });
    };

    $scope.update = function(sweater) {
      sweater.editing = false;
      $http.put('/api/sweaters/' + sweater._id, sweater)
        .then(function(res) {
          console.log('this sweater has a new identity (placed in sweater witness protection)');
        }, function(err) {
          $scope.errors.push('could not get sweater: ' + sweater.name + ' to sweater trial');
          console.log(err.data);
        });
    };

    $scope.remove = function(sweater) {
      if (confirm('Are you sure you want to frog this sweater?')) {
        $scope.sweaters.splice($scope.sweaters.indexOf(sweater), 1);
        return $http.delete('/api/sweaters/' + sweater._id)
        .then(function(res) {
          console.log('totes cool, sweater frogged');
        }, function(err) {
          console.log(err.data);
          $scope.errors.push('could not frog this sweater: ' + sweater.name + '. Ribbit.');
          $scope.getAll();
        });
      } else {
        return;
      }
    };
  }]);
};
