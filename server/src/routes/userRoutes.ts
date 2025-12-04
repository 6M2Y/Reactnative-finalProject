import { Task } from "../models/Task";
import { User } from "../models/userModel";
import express, { Request,Response } from "express";

const userRouter = express.Router();


// Get family members (children)
userRouter.get('/:familyCode', async (req, res) => {
 /*  const { familyCode } = req.params;

  try {
    const members = await User.find({ familyCode });
    res.json(members);
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to load family members', error: error.message });
  } */
   try {
    const { familyCode } = req.params;

    const users = await User.find({ familyCode });

    // fetch all tasks once
    const tasks = await Task.find({ familyCode });

    const enrichedUsers = users.map((u):any => {
      const completedCount = tasks.filter(
        t => t.assignedTo?.toString() === u._id.toString() && t.completed
      ).length;

      return {
        ...u.toObject(),
        completedTasks: completedCount,
      };
    });

    res.json(enrichedUsers);
  } catch (e:any) {
    res.status(500).json({ message: e.message });
  }
});

//fetch available tasked using family code
userRouter.get('/:familyCode/available', async (req: Request, res: Response) => {
  const { familyCode } = req.params
  
  try {
    const task = await Task.find({
      familyCode,
      assignedTo:null
    })

    res.json(task)
  } catch (error: any) {
    res.status(500).json({message:"Error while fetching available tasks", error:error.message})
  }
})

//fetch available tasked using family code
userRouter.get('/:familyCode/available', async (req: Request, res: Response) => {
  const { familyCode } = req.params
  
  try {
    const task = await Task.find({
      familyCode,
      assignedTo:null
    })

    res.json(task)
  } catch (error: any) {
    res.status(500).json({message:"Error while fetching available tasks", error:error.message})
  }
})

//get assigned taks
userRouter.get('/assigned/:usedId', async (req: Request, res: Response) => {
  const { userId } = req.params
  
  try {
    const tasks = await Task.find({ assignedTo: userId })
    res.json(tasks)
  } catch (err:any) {
    res.status(500).json({message:"Error fetching user assigned tasks", error:err.message})
  }
})


export default userRouter;