var angular = window.angular;
module.exports = function(app) {
  app.controller('RenderController', ['$scope', function($scope) {

    $scope.drawHem = function() {
      console.log('hello from controller version of drawHem');
      ctx1.beginPath();
      ctx1.moveTo(hemLX,hemLY);
      ctx1.lineTo(hemRX,hemRY);
      ctx1.closePath();
      ctx1.stroke();
    };
  }]);
};