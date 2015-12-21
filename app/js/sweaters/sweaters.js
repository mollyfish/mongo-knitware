module.exports = function(app) {
  require('./controllers/sweaters_controller')(app);
  require('./controllers/all_sweaters_controller')(app);
  // require('./controllers/render_controller')(app);
  require('./directives/sweater_directive')(app);
  require('./directives/sweater_transclude_directive')(app);
  require('./directives/sweater_form_directive')(app);
  // require('./directives/sweater_render_directive')(app);
};
