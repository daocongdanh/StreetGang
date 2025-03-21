const delayMiddleware = (delayTime) => {
  return (req, res, next) => {
    setTimeout(() => next(), delayTime);
  };
};

module.exports = delayMiddleware;
