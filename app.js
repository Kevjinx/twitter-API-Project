const express = require("express");
const morgan = require("morgan");
const { environment } = require('./config');
const app = express();
const tweetsRouter = require('./routes/tweets')
const indexRouter = require('./routes/index')

app.use(express.json())
app.use(morgan("dev"));
app.use(tweetsRouter)
app.use(indexRouter)


// Catch unhandled requests and forward to error handler.
app.use((req, res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.status = 404;
  next(err);
});

// Custom error handlers.
function tweetNotFound(tweetId) {
  const error = new Error(`Tweet ${ tweetId } not found`);

  error.title = 'Tweet not found';
  error.status = 404;

  return error;
}


// Generic error handler.
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  const isProduction = environment === "production";
  res.json({
    title: err.title || "Server Error",
    message: err.message,
    stack: isProduction ? null : err.stack,
  });
});



module.exports = app;
