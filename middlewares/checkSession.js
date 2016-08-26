var users = require('../models/user.js');

/*      SESSION-MANAGER
  1.  check if user is logged in (session variable is set)
  2.  if it is set, check the database for the id, if not, end connection
  3.  if user is found, continue connection. if not, en connection.
  */
module.exports = function checkSession(req, res, next) {
  //check for sesion variable
  if (typeof req.session.name !== 'undefined') {
    //lookup user
    users.getUser(req.session.name, function(err, result) {
      if(result) {
        //user found, continue connection
        next();
      }
      else {
        //user not found, terminate onnection
        res.redirect('/login');
      }
    });
  } else {res.redirect('/login');}
};
