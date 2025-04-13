import jwt from "jsonwebtoken";

// check jwt tokens
function jwtAuthMiddleware(req, res, next) {

  const token = req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.sendStatus(404).json({ Response: "Token not available" });
  }

  try {
    const decodedData = jwt.verify(token, process.env.REFRESH_TOKEN_SCERECT);
    req.user = decodedData;
    next();
  } catch (error) {
    console.log("Invailid Token: ", error);
    res.sendStatus(401).json({ error: "Invailid Token" });
  }
}

// generate jwt tokens
function generateToken(payload) {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SCERECT);
}

export { generateToken, jwtAuthMiddleware };