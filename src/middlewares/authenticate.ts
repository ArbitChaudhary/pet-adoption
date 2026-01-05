import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      id: string;
    }
  }
}

interface DecodedToken extends JwtPayload {
  userId: string;
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
