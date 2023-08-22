import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.token.token;
    if (!token) return res.status(401).json({ message: "Unauthorized!" });
    jwt.verify(token, process.env.SECRET_KEY, (error, user) => {
      if (error) {
        return res.status(401).json({ message: "Wrong credentials!" });
      }
      req.user = user;
    });
    next();
  } catch (err) {
    next(err);
  }
};
