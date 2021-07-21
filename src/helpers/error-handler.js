module.exports = errorHandler;

function errorHandler(err, req, res, next) {
  switch (true) {
    case err.name === "UnauthorizedError":
      // jwt authentication error
      return res.status(401).json({ message: "Unauthorized" });
    default:
      return res.status(500).json({ message: err.message });
  }
}
