"use stricts";

var taskController = require('./../controllers/task.js');

module.exports = (function(){
  return [
    {
      method: 'GET',
      path: '/tasks',
      config: {
        handler: taskController.findAll
      }
    },{
      method: 'POST',
      path: '/tasks',
      config: {
        handler: taskController.saveTask
      }
    },{
      method: 'GET',
      path: '/tasks/{taskId}',
      config: {
        handler: taskController.findById
      }
    }
  ];
})();