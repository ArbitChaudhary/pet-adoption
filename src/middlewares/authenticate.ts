import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      id: string;
      role: string;
    }
  }
}

interface DecodedToken extends JwtPayload {
  userId: string;
  role: string;
}

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers.authorization;
  const token = header?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden" });
    }
    req.id = (decoded as DecodedToken)?.userId;
    next();
  });
};

export const verifyAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers.authorization;
  const token = header?.split(" ")[1];
  console.log("Received Token for Admin Verification:", token);

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  jwt.verify(token, process.env.JWT_SECRET as string, (error, decoded) => {
    console.log("Decoded Token:", decoded);
    if (error) {
      return res.status(403).json({ message: "Forbidden" });
    }
    if (decoded && (decoded as DecodedToken).role !== "admin") {
      return res.status(403).json({ message: "Unauthorized Role!!!" });
    }
    req.role = (decoded as DecodedToken).role;
    next();
  });
};
