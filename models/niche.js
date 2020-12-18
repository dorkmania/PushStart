'use strict';

// Unused

// In the production version, Niches will have their own model and be independent entities

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
		trim: true
	},
	industry: {
		type: [Mongoose.Schema.Types.ObjectId],
		ref: 'Industry',
		unique: false,
		required: false,
	},
	niches: {
		type: [Mongoose.Schema.Types.ObjectId],
		ref: 'Niche',
		unique: false,
		required: false,
	}
});

let Partner = Mongoose.model('Partner', PartnerSchema);
module.exports = Partner;

