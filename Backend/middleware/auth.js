import jwt from "jsonwebtoken";

// generate jwt tokens
function generateToken(payload) {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SCERECT);
}

function jwtAuthMiddleware(req, res, next) {
  const token = req.header.authorization.split(" ")[1];

  if (!token)
    return res.sendStatus(403).json({ Response: "Token not available" });

  try {
    const endCodedData = jwt.verify(token, process.env.ACCESS_TOKEN_SCERECT);
    req.user = endCodedData
    next()
  } catch (error) {
    console.log("Invailid Token ",error);
    res.sendStatus(401).json({error:"Invailid Token"})
  }
}
