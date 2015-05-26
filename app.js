var Hapi = require('hapi'),
server =  new Hapi.Server(),
Good = require('good'),
Bcrypt = require('bcrypt'),
Basic = require('hapi-auth-basic'),
routes = require('./src/routes/tasks.js');

server.connection({
  host: 'localhost',
  port: 3030
});


//User vars
var users = {
  john: {
    username: 'john',
    password: '$2a$10$iqJSHD.BGr0E2IxQwYgJmeP3NvhPrXAeLSaGCj6IR/XU5QtjVu5Tm',   // 'secret'
    name: 'John Doe',
    id: '2133d32a'
  }
};

var validate = function(username, password, callback){
  var user = users[username];
  if(!user){
    return callback(null, false);
  }

  Bcrypt.compare(password, user.password, function(err, isValid){
    callback(err, isValid, { id: user.id, name: user.name })
  });
};

for(var route in routes){
  server.route(routes[route]);
}

/*
server.route([ {
  method: 'GET',
  path: '/',
  handler: function(req, rep){
    rep("Hello world");
  }
} ]);
*/

server.register({
  register: Good,
  options: {
    reporters: [{
      reporter: require('good-console'),
      events: {
        response: '*',
        log: '*'
      }
    }]
  }
}, function(err){
  if (err) {
    throw err;
  }

  server.start(function(){
    server.log('info', 'Server running at: ' + server.info.uri);
  });
});
/*

server.register(Basic, function(err){
  server.auth.strategy( 'simple', 'basic', { validateFunc: validate } );

  server.route({
    method: 'GET',
    path: '/auth',
    config: {
      auth: 'simple',
      handler: function(req, rep){
        rep('hello, ' + req.auth.credentials.name);
      }
    }
  });
});
*/
server.start();