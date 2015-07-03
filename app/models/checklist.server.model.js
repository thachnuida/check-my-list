'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Checklist Schema
 */
var ChecklistSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Checklist name',
		trim: true
	},
	key: {
		type: String,
		unique: true
	},
	items: [{
		content: String,
		isCheck: Boolean
	}],
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Checklist', ChecklistSchema);