"use strict";

var joi = require('joi');

function TaskModel(){
  this.schema = {
    taskId: Joi.number().integer(),
    name: Joi.string().max(50),
    description: Joi.string().max(255)
  }
}