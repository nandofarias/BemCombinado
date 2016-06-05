'use strict';

function pageNotFound(req, res) {
    var viewFilePath = '404';
    var statusCode = 404;
    var result = {
        status: statusCode
    };

    res.status(result.status);
    res.render(viewFilePath, {}, function(err, html) {
        if (err) {
            return res.json(result, result.status);
        }

        res.send(html);
    });
};

function serviceUnavailable(req, res) {
    var viewFilePath = '503';
    var statusCode = 503;
    var result = {
        status: statusCode
    };

    res.status(result.status);
    res.render(viewFilePath, {}, function(err, html) {
        if (err) {
            return res.json(result, result.status);
        }

        res.send(html);
    });
};


function validationError(res, statusCode) {
    statusCode = statusCode || 422;
    return function(err) {
        console.log(err);
        var error = err;
        if(!err.hasOwnProperty("errors")){
            error = {
                errors: [
                    {
                        message: err.message
                    }
                ]
            }
        }

        res.status(statusCode).json(error);
    }
}

function handleError(res, statusCode) {
    statusCode = statusCode || 500;
    return function(err) {
        res.status(statusCode).send(err);
    };
}

module.exports = {
    404: pageNotFound,
    500: serviceUnavailable,
    validationError: validationError,
    handleError: handleError
}