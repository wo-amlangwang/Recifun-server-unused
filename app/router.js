var middleware = require('./middleware/middleware');
module.exports = function(app,passport) {
  app.post('/api/register',middleware.local.register);

  app.get('/api/facebook/token',
    passport.authenticate('facebook-token'),
    function (req, res) {
      res.sendStatus(req.user? 200 : 401);
    }
  );

  app.post('/api/login', middleware.local.login);

  app.get('/api/logout',function(req,res,nest) {
    req.logout();
    res.sendStatus(200);
  });

  app.get('/',function(req,res,next) {
    if(req.isAuthenticated()){
      res.send('yes');
    }else {
      res.send('no');
    }
  });
};
