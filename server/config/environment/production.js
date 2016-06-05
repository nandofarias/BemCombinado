'use strict';

// Production specific configuration
// =================================
module.exports = {
    mongo: {
        uri:  process.env.MONGOLAB_URI
    }
};
