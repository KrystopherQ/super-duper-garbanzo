const diagnostics = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');
// GET Route for retrieving diagnostic information
diagnostics.get('/', (req, res) => {
    readFromFile('../db/diagnostics.json').then((data) => res.json(JSON.parse(data)))

    // TODO: Logic for sending all the content of db/diagnostics.json

});

// POST Route for a error logging
diagnostics.post('/', (req, res) => {
    const { time, error_id, errors } = req.body;

    // If all the required properties are present
    if (errors.tip && errors.topic && errors.username) {
        // Variable for the object we will save
        const newError = {
            time,
            tip,
            topic,
            username,
            error_id: uuidv4(),
        };
        readAndAppend(newError, '../db/diagnostics.json')
        const response = {
            status: 'failure',
            body: newError,
        }
        res.json(response);
    }

    // TODO: Logic for appending data to the db/diagnostics.json file
});

module.exports = diagnostics;