'use strict';

const express = require('express');
const Router = express.Router();
const ProcReq = require('../scripts/process-request')

Router.get('/', function (req, res)
{
    return res.render('index')
});

//POST for query form
Router.post('/', function (req, res)
{
    return ProcReq
        .handleForm(req.body)
        .then(result =>
        {
            return res.render('result', {partners: result.partners, maxScore: result.maxScore});
        })
        .catch(err =>
        {
            console.error(err);
            return res.sendStatus(502);
        })
})

Router.all('/*', function (req, res)
{
    return res.render('404');
});

module.exports = Router;