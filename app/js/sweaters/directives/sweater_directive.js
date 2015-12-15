module.exports = function(app) {
  app.directive('sweaterDirective', function() {
    return {
      restrict: 'AC',
      templateUrl: '/templates/sweater_directive_template.html',
      scope: {
        sweater: '=',
      }
    }
  });
};
