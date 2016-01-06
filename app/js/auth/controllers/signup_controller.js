module.exports = function(app) {
  app.controller('SignupController', ['$scope', '$http', '$cookies', '$location', function($scope, $http, $cookies, $location) {
    $scope.headingText = 'Create New Account';
    $scope.buttonText = 'Create Account';

    $scope.authenticate = function(user) {
      $http.post('/api/signup', user)
        .then(function(res) {
          $cookies.put('token', res.data.token);
          $scope.getUser();
          $location.path('/sweaters');

        }, function(err) {
          console.log(err);
        })
    };

    $scope.changePlaces = function() {
      $location.path('/signin');
    };
  }]);
};