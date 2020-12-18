'use strict';

let Mongoose = require('mongoose');

let PartnerSchema = new Mongoose.Schema({
	name: {
		type: String,
		unique: true,
		required: true,
		trim: true
	},
	city: {
		type: String,
		required: true,
		unique: false,
		index: true
	},
	industry: {
		type: String,
		unique: false,
		required: true,
		index: true
	},
	niches: {
		type: [String],
		unique: false,
		required: true,
	},
	average_billable: {
		type: Mongoose.Decimal128,
		ref: 'Niche',
		required: true,
	},
	turnaround_time: {
		type: String,
		enum: ['low', 'medium', 'high'],
		default: 'medium',
		unique: false,
		required: true,
	},
	expertise: {
		type: String,
		enum: ['low', 'medium', 'high'],
		default: 'medium',
		unique: false,
		required: true,
	},

	// Unused

	// In the production version, Industries and Niches will be referenced from their own collections

	/*
	industry: {
		type: [Mongoose.Schema.Types.ObjectId],
		ref: 'Industry',
		unique: false,
		required: true,
	},
	niches: {
		type: [Mongoose.Schema.Types.ObjectId],
		ref: 'Niche',
		unique: false,
		required: false,
	}
	*/
});

let Partner = Mongoose.model('Partner', PartnerSchema);
module.exports = Partner;

