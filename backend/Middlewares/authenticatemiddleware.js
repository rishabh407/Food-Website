import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
  const token = req.cookies.accesstoken;
  if (!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;//we are storing the decoded data into into the user object which can be used by next functions.
    next();
  } catch {
    return res.status(401).json({ message: "Token expired" });
  }
};
