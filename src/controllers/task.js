"use stricts";

var taskDAO = require('./../dao/task.js'),
Hapi = require('hapi'),
ReplyHelper = require('./reply-helper')
Q = require('q');

function TaskController(){
  this.findAll = function(req, rep){
    var helper = new ReplyHelper(req, rep);
    taskDAO.findAll(function (err, data){
      helper.replyFindAll(err, data);
    });
  };
  this.saveTask = function(req, rep){
    var helper = new ReplyHelper(req, rep),
    saveTask = Q.denodeify(taskDAO.saveTask),
    findById = Q.denodeify(taskDAO.findById),
    params = req.payload;

    saveTask(params).
      then(function (data){


        var result = data;

        params.taskId = result.insertId;


        return findById(params);
      }).
      then(function (data){


        //var location = helper.url + req.path + '/' + params.taskId;

        rep(data[0])
          .type('application/json')
          .code(201);
      }).
      catch(function (err) {
        rep(Hapi.error.badImplementation(err));
      });
  };
  this.findById = function (req, rep){
    var helper = new ReplyHelper(req, rep),
    params = req.params;
    taskDAO.findById(params, function(err, data){
      helper.replyFindById(err, data);
    });
  }
}

var taskController = new TaskController();
module.exports = taskController;