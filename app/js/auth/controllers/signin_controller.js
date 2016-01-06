module.exports = function(app) {
  app.controller('SigninController', ['$scope', '$http', '$cookies', '$location', '$base64', function($scope, $http, $cookies, $location, $base64) {
    $scope.headingText = 'Log In';
    $scope.buttonText = 'Log In';

    $scope.authenticate = function(user) {
      $http({
        method: 'GET',
        url: '/api/signin',
        headers: {
          'Authorization': 'Basic ' + $base64.encode(user.username + ':' + user.password)
        }
      })
        .then(function(res) {
          $cookies.put('token', res.data.token);
          $scope.getUser();
          $location.path('/sweaters');
        }, function(err) {
          console.log(err);
        });
    };

    $scope.changePlaces = function() {
      $location.path('/signup');
    };
  }]);
};