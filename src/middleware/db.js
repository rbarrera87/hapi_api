var mysql = require('mysql');

module.exports = (function(){
  var internals = {},
  externals = {},
  pool = mysql.createPool({
    connectionLimit: 10,
    host: '127.0.0.1',
    user: 'root',
    database: 'hapi-todo'
  });

  internals.pool = pool;

  internals.connect = function(connectHandler){
    pool.getConnection(function(err, connection) {
      if (err) return connectHandler(err, null);
      return connectHandler(null, connection);
    });
  };

  externals.query = function(params) {
    var sql = params.sql;
    var values = params.values;
    var queryHandler = params.callback;
    internals.connect(function(err, connection) {
      if (err) return queryHandler(err, null);
      connection.query(sql, values, function(err, rows, fields) {
        queryHandler(err, rows);
        connection.release();
      });
    });
  };

  return externals;
})();