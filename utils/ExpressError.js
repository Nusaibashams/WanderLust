class ExpressError extends Error {
    constructor(statusCode, message) {
        super(); // Call the parent class constructor (Error)
        this.statusCode = statusCode; // Set the status code
        this.message = message; // Set the custom message
    }
}
module.exports = ExpressError;
