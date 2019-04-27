const Client = require('./client');

module.exports = {
    /**
     * Create a new instance of the `Client`
     * @param {import("./client").DefaultOptions} options Additional options to add on
     */
    create: (options) => new Client(options)
}

// Type Definitions

/**
 * @typedef {Object} PieceOptions
 * @prop {string} path The path
 */