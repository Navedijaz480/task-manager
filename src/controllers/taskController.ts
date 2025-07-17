import { Request } from 'express';
import Task from '../models/Task';
import { Response } from 'express';
import { Request as ExpressRequest } from 'express';

interface AuthRequest extends ExpressRequest {
  user?: {
    id: string;
  };
}


export const getTasks = async (req: AuthRequest, res: Response) => {
  const tasks = await Task.find({ userId: req.user?.id });
  res.json(tasks);
};


export const createTask = async (req: AuthRequest, res: Response) => {
    const task = await Task.create({ ...req.body, userId: req.user?.id });
    res.status(201).json(task);
};

export const getTasksA = async (req: AuthRequest, res: Response) => {
    const tasks = await Task.find({ userId: req.user?.id });
    res.json(tasks);
};

export const updateTask = async (req: AuthRequest, res: Response) => {
    const task = await Task.findOneAndUpdate({ _id: req.params.id, userId: req.user?.id }, req.body, { new: true });
    res.json(task);
};

export const deleteTask = async (req: AuthRequest, res: Response) => {
    await Task.findOneAndDelete({ _id: req.params.id, userId: req.user?.id });
    res.status(204).send();
};