import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (token) {
      token = token.split(" ")[1];
      let decode = jwt.verify(token, process.env.SECRET_KEY);
      req.userId = decode?.id;
    }

    if (!req.userId)
      return res.status(401).json({ message: "User id not Match: Unauthenticated" });

    next();
  } catch (error) {
    console.log("error: ", error);
    res.status(401).json({ message: "Authenticatio Failed" });
  }
};