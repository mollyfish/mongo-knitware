var angular = window.angular;
module.exports = function(app) {
  app.controller('AllSweatersController', ['$scope', '$http', function($scope, $http) {
    $http.get('/api/allsweaters')
    .then(function(res) {
      $scope.sweaters = res.data;
    }, function(err) {
      console.log(err);
    })
  }]);
};
