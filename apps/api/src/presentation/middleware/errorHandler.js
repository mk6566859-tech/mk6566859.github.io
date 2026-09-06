export function errorHandler(error, _req, res, _next) {
  console.error(error);

  res.status(400).json({
    message: error.message || "Unexpected server error."
  });
}
