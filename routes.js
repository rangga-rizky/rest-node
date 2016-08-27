module.exports = function(router){
  //registering controller
  var contactController = require('./controllers/contact');
  var authController = require('./controllers/auth');
  var userController = require('./controllers/user');

  //registering router
  router.get('/', function(req, res) {
    res.json({ message: 'welcome' });
  });
  // Create endpoint for /contact
  router.route('/contact')
    .post(authController.isAuthenticated,contactController.postContact)
    .get(authController.isAuthenticated,contactController.getContacts);
  // Create endpoint for /contact/:_id
  router.route('/contact/:_id')
    .get(authController.isAuthenticated,contactController.getContact)
    .put(authController.isAuthenticated,contactController.putContact)
    .delete(authController.isAuthenticated,contactController.deleteContact);

  //endpoint for /contact/search/:searchby/:query
  router.route('/contact/search/:searchby/:query')
      .get(authController.isAuthenticated,contactController.searchContact)

  // Create endpoint for /users
  router.route('/users')
    .post(userController.postUsers)
    .get(userController.getUsers);

  return router;
};
