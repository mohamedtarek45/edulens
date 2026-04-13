import jwt from "jsonwebtoken";
export const authOptional = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) return next();

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
  } catch (err) {}

  next();
};

export const authRequired = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) return res.status(401).json({ message: "Not authenticated" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }

  next();
};
export const StudentAuth = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) return res.status(401).json({ message: "Not authenticated" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "student") {
      return res.status(401).json({ message: "Not authorized" });
    }
    req.user = decoded;
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }

  next();
};
export const TeacherAuth = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) return res.status(401).json({ message: "Not authenticated" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "teacher") {
      return res.status(401).json({ message: "Not authorized" });
    }
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: "Invalid token" });
  }

  next();
};
