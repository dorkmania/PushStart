'use-strict';

'use strict';

// Unused

// In the production version, Industries will have their own model and be independent entities

let Mongoose = require('mongoose');

let IndustrySchema = new Mongoose.Schema({
	name: {
		type: String,
		unique: true,
		required: true,
		trim: true
	},
});

let Industry = Mongoose.model('Industry', IndustrySchema);
module.exports = Industry;

