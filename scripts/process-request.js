'use strict';

const Partner = require('../models/partner');

// Handles static choices of Partners.
// In the Production version, assignment and mapping of Industries and symbols will make mangement of data-sources streamlined and structured

// Since in this version, all parameters are compulsory, there is a 100% (p = 1) degree of inclusion.

/*

If a parameter meets the condition, then it is added to the weighted score as p * w, where w is the weight of an parameter such that
W1, W2, W3, ....Wn where 'n' is the number of parameters and Sum(Wn) = 1

*/

exports.handleForm = (params) =>
{
	let {industry, budget, city, exp, niches, urgency} = params; // Max Score {N/A, 1, 2, <niches.length>, 2)

	niches = formatNiches(niches);
	budget = parseInt(budget);

	let maxScore = 5 + niches.length;

	return Partner
		.find({industry: industry})
		.exec()
		.then(partners =>
		{
			if(partners.length == 0)
			{
				return Promise.resolve(partners);
			}

			assignScores(partners, {budget, city, exp, niches, urgency});

			return Promise.resolve({partners: partners, maxScore: maxScore});
		})
		.catch(err =>
		{
			return Promise.reject(err);
		})

}

function assignScores(partners, params)
{
	for(let i = 0, len = partners.length - 1; i <= len; ++i)
	{
		let partner = partners[i];
		partner.weighted_score = 0;

		if(partner.average_billable <= params.budget)
		{
			partner.weighted_score += 1;
		}

		if(partner.city.localeCompare(params.city) === 0)
		{
			partner.weighted_score += 1;
		}

		partner.weighted_score += Math.min(quantifyDegree(partner.expertise), params.exp);
		partner.weighted_score += Math.min(quantifyDegree(partner.turnaround_time), params.urgency);

		let nicheSet = new Set(partner.niches);
		let setBaseSize = nicheSet.size;

		for(let j = 0, len = params.niches.length - 1; j <= len; ++j) // Inefficient Solution for comparing params
		{
			nicheSet.add(params.niches[j]);
		}

		let extraSetElementCount = nicheSet.size - setBaseSize;

		partner.weighted_score += params.niches.length - extraSetElementCount;
	}

	partners.sort((p1, p2) => p2.weighted_score - p1.weighted_score);
}

function formatNiches(niches)
{
	niches = niches.trim();
	niches = niches.toLowerCase();
	niches = niches.replace(/,\s|\s/g, ',');
	niches = niches.split(',');
	niches = [...new Set(niches)];
	return niches
}

function quantifyDegree(degree)
{
	if(degree.localeCompare('low') === 0)
	{
		return 0;
	}

	if(degree.localeCompare('medium') === 0)
	{
		return 1;
	}

	return 2;
}