var url = 'http:mylogger.io/log';

function log(message)
{
    // sand an HTTP request
    console.log(message);
}

module.exports.log = log;