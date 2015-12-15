module.exports = function(app) {
  app.directive('sweaterTranscludeDirective', function() {
    return {
      restrict: 'AC',
      templateUrl: '/templates/sweater_transclude_directive.html',
      transclude: true,
      scope: {
        messageOne: '@'
      }
    }
  });
};
