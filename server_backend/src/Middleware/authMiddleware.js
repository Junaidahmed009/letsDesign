import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {
    // 1. Get token from cookies
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "no token recived" });
    }

    // 2. Verify token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // 3. Attach user data to request

    req.user = decoded;
    // console.log(user);

    next(); // continue to the protected route
  } catch (error) {
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};
