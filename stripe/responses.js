// send responses
function successObj(res, success, message, data = {})
{
  res.send({
    success, message, data
  })
}
function errorObj(res, status, message, data = {} )
{
  res.status(status).send({
    success : 0,
    message, data
  })
}

function logErrors(err, req, res, next )
{
// write to file
next(err)
}

function globalErrorHandler(err, req, res, next )
{
  console.log(err)
  res.status(500).send({
    success : 0,
    message : "Internal server Error",
    data : err
  })
}

function stripeErr(res, err )
{
  console.log(err);
  let message
  switch (err.type) {
    case 'StripeCardError':
    console.log('in StripeCardError');
    message = err.message
          // A declined card error
          break;
          case 'StripeRateLimitError':
          console.log('in StripeRateLimitError');
          message = err.message
          // Too many requests made to the API too quickly
          break;
          case 'StripeInvalidRequestError':
          console.log('in StripeInvalidRequestError');
          message = err.message
          // Invalid parameters were supplied to Stripe's API
          break;
          case 'StripeAPIError':
          console.log('in StripeAPIError');
          message = err.message
          // An error occurred internally with Stripe's API
          break;
          case 'StripeConnectionError':
          console.log('in StripeConnectionError');
          message = err.message
          // Some kind of error occurred during the HTTPS communication
          break;
          case 'StripeAuthenticationError':
          console.log('in StripeAuthenticationError');
          message = err.message
          // You probably used an incorrect API key
          break;
          default:
          // Handle any other types of unexpected errors
          message= 'Dont know'
          break;
        }
        res.status(200).send({
          success : 0,
          message,
          data : err
        })
      }

      global.successObj = successObj
      global.errorObj = errorObj
      global.stripeErr = stripeErr


      module.exports = { logErrors, globalErrorHandler }