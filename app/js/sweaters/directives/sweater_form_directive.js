module.exports = function(app) {
  app.directive('sweaterFormDirective', function() {
    return {
      restrict: 'AC',
      replace: true,
      templateUrl: 'templates/sweater_form_template.html',
      transclude: true,
      scope: {
        buttonText: '@',
        headingText: '@',
        formName: '@',
        sweater: '=',
        save: '&'
      }    
    }
  });
};
