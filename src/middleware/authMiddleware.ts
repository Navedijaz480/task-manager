import { Request, Response, NextFunction } from 'express';
import { Request as ExpressRequest } from 'express';

interface AuthRequest extends ExpressRequest {
  user?: {
    id: string;
  };
}

import jwt from 'jsonwebtoken';

interface JwtPayload {
    id: string;
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token provided' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
        req.user = { id: decoded.id };
        next();
    } catch {
        res.status(401).json({ error: 'Invalid token' });
    }
};