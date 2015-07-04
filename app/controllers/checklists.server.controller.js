'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Checklist = mongoose.model('Checklist'),
	_ = require('lodash'),
	uuid = require('uuid');

/**
 * Create a Checklist
 */
exports.create = function(req, res) {
	var checklist = new Checklist(req.body);
	checklist.user = req.user;
	checklist.key = uuid.v4();

	checklist.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(checklist);
		}
	});
};

/**
 * Show the current Checklist
 */
exports.read = function(req, res) {
	res.jsonp(req.checklist);
};

/**
 * Update a Checklist
 */
exports.update = function(req, res) {
	var checklist = req.checklist ;

	checklist = _.extend(checklist , req.body);

	checklist.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(checklist);
		}
	});
};

/**
 * Update item in Checklist
 */
exports.updateItem = function(req, res) {
	var checklist = req.checklist;
	var isCheck = req.body.isCheck;
	var itemId = req.params.itemId;

	if (typeof(isCheck) !== 'boolean') {
		return res.status(400).send({
			message: errorHandler.ERRORS.WRONG_VALUE_DATA
		});
	} else {
		Checklist.update({'items._id': itemId}, {'$set': {'items.$.isCheck': isCheck}}, function(err) {
			if (err) {
				res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				res.jsonp({changed: true});
			}
		});
	}
};

/**
 * Delete an Checklist
 */
exports.delete = function(req, res) {
	var checklist = req.checklist ;

	checklist.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(checklist);
		}
	});
};

/**
 * List of Checklists
 */
exports.list = function(req, res) {
	Checklist.find().sort('-created').populate('user', 'displayName').exec(function(err, checklists) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(checklists);
		}
	});
};

/**
 * Checklist middleware
 */
exports.checklistByID = function(req, res, next, id) {
	Checklist.findOne({key: id}).populate('user', 'displayName').exec(function(err, checklist) {
		if (err) return next(err);
		if (! checklist) return next(new Error('Failed to load Checklist ' + id));
		req.checklist = checklist ;
		next();
	});
};

/**
 * Checklist authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.checklist.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
