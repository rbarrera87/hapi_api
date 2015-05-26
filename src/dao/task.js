"use strict";

var db = require('./../middleware/db');

function TaskDAO(){

  var findAll = function (callback){
    var sql = 'Select * From task';
    db.query({
      sql: sql,
      callback: callback
    });
  },
  findById = function(params, callback){
    var values = [
      params.taskId
    ];
    var sql = "Select * From task where taskId = ?";

    db.query({
      sql: sql,
      values: values,
      callback: callback
    });
  },
  saveTask = function(params, callback){
    var values = [
      params.name,
      params.description
    ];
    var sql = "Insert into task(name, description)"+
                  "values(?, ?)";

    db.query({
      sql: sql,
      values: values,
      callback: callback
    });
  }

  return {
    findAll: findAll,
    saveTask: saveTask,
    findById: findById
  }
}

var taskDAO = new TaskDAO();
module.exports = taskDAO;