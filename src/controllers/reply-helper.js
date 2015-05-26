function ReplyHelper(req, rep){
  this.req = req;
  this.rep = rep;
};

ReplyHelper.prototype.replyFindAll = function(err, data) {
  var response = this.rep(data).hold();
  response.type('application/json')
    .header('Total-Count', data.length)
    .send();
};
ReplyHelper.prototype.replySaveTask = function(err, data){

};

ReplyHelper.prototype.replyFindById = function(err, data){
  if (err) return this.rep(Hapi.error.badImplementation(err));

  if (data[0]) this.rep(data[0]).type('application/json');
  else this.rep().code(404);
};

module.exports = ReplyHelper;