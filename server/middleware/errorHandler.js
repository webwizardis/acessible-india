export function errorHandler(error, _request, response, _next) {
  if (error.publicMessage) {
    console.warn(error.publicMessage);
  } else {
    console.error(error);
  }
  response.status(error.status || 500).json({ error: error.publicMessage || 'Something went wrong on the server.' });
}