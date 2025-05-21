module.exports = function (handler) {
    return async(req, res, next) => {
        try {
            await handler(req, res)
        } catch (error) {
         next(error)   
        }
    }
}

// What is asyncMiddleware?
// asyncMiddleware is a higher-order function that takes an asynchronous function (handler) as an argument and returns a new function. This new function is designed to handle errors that may occur during the execution of the asynchronous code. It does this by using a try-catch block to catch any errors and pass them to the next middleware function in the Express.js request-response cycle. This allows for centralized error handling in Express applications, making it easier to manage errors and keep the code clean and maintainable.

// It's a wrapper function that catches any errors from an async route handler and sends them to Express's error handler.

// Why do we call handler(req, res) manually inside the wrapper?
// - this is because Express doesn't call the origin handler anymore - it only calls the wrapper. So inside the wrapper, I must manually call the original handler to make it run
 
// When is it useful? 
// - when I want to avoid writing try-catch in every async route. I just wrap my handler with this once