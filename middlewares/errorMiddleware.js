const errorMiddleware = (error, _req, res) => {
  res.status(500).json({ message: error.message });
};

module.exports = errorMiddleware;
