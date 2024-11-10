const { sign, verify } = require('jsonwebtoken');

const createAccessToken = backendServiceId => {
  const token = sign(backendServiceId, process.env.JWT_SECRET, {
    expiresIn: '1000d',
  });
  return token;
};

const verifyToken = (req, res, next) => {
  const bearer = req.headers.authorization || req.headers.Authorization;
  if (!bearer)
    return res.status(401).json({ message: 'Authorization header missing' });

  const accessToken = bearer.split(' ')[1];
  if (!accessToken)
    return res.status(401).json({ message: 'Access token missing' });

  try {
    const valid = verify(accessToken, process.env.JWT_SECRET);
    if (valid) {
      req.backendService = valid;
      next();
    } else {
      return res.status(401).json({ message: 'Invalid access token' });
    }
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = {
  createAccessToken,
  verifyToken,
};
