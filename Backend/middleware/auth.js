import jwt from "jsonwebtoken";

// check jwt tokens
function jwtAuthMiddleware(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res
        .sendStatus(401)
        .json({ Response: "Unauthorized, token is not available" });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SCERECT, (err, decodedData) => {
      if (err) {
        res.sendStatus(403).json({ massage: "Token expired" });
      }
      req.user = decodedData;
    });

    next();
  } catch (error) {
    console.log("Invailid Token: ", error);
    res.sendStatus(401).json({ massage: "Session expired", error: err });
  }
}

// generate jwt tokens
function generateAccessToken(payload) {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SCERECT, {
    expiresIn: "15m",
  });
}

function generateRefreshToken(payload) {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SCERECT, {
    expiresIn: "7d",
  });
}

export { generateAccessToken, generateRefreshToken, jwtAuthMiddleware };
