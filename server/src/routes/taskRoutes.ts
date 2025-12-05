import express, { Request, Response } from 'express';
import { Task } from '../models/Task';
import { ITask } from '../types/tasktypes';
import { User } from '../models/userModel';

const taskRoutes = express.Router();

// GET /tasks
taskRoutes.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { familyCode, userId, role } = req.query;

    if (!familyCode) {
      res.status(400).json({ message: "Missing family code" });
      return;
    }

    let tasks;

    // Parent → see all tasks in family
    if (role === "parent") {
      tasks = await Task.find({ familyCode })
        .populate("assignedTo", "name _id");
      res.json(tasks);
      return;
    }

    // Child → see only their tasks
    if (role === "child" && userId) {
      tasks = await Task.find({
        familyCode,
        assignedTo: userId,
      }).populate("assignedTo", "name _id");
      res.json(tasks);
      return;
    }

    // Default → ALL household tasks
    tasks = await Task.find({ familyCode })
      .populate("assignedTo", "name _id");

    res.json(tasks);

  } catch (err) {
    res.status(500).json({ message: err });
  }
});


//post new  task
taskRoutes.post('/', async (req: Request, res: Response):Promise<void> =>{
    const { title, description, assignedTo, status, points, dueDate, familyCode, recurrence, recurrenceDays } = req.body; // Destructure task details from request body

     const finalAssignedTo = assignedTo === '' ? null : assignedTo;
    const newTask = new Task({
        title,
        description,
        assignedTo: finalAssignedTo,
        status,
        points,
        familyCode,
        dueDate,
        recurrence,
        recurrenceDays
    }); // Create a new Task instance
    try {
        const savedTask = await newTask.save(); // Save the task to the database
        res.status(201).json(savedTask); // Respond with the saved task
    } catch (err) {
        res.status(400).json({ message: err });
    }
});

//update task by id
taskRoutes.put('/:id', async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true });// Return the updated document
        console.log(updatedTask)

        if (updatedTask) { // Check if task was found and updated
            res.json(updatedTask); // Respond with the updated task
        } else { // Task not found
            res.status(404).json({ message: 'Task not found' });
        }   
    } catch (err) {
        res.status(400).json({ message: err });
    }
});

 //update task by id
//verify
taskRoutes.put('/:id/verify', async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const verifiedTask = await Task.findByIdAndUpdate(id, {verified:true}, { new: true });// Return the updated document

        if (!verifiedTask) {
            res.status(404).json({ message: 'Task not found' });
            return;
        }
    
        if(verifiedTask.assignedTo)
        { // Check if task was found and updated
            const child = await User.findById(verifiedTask.assignedTo);
            if (child) {
                const taskPoints = Number(verifiedTask.points) || 0;
                child.points = (Number(child.points) || 0) + taskPoints;
                await child.save()
            }
            res.json(verifiedTask); // Respond with the updated task
        }
    } catch (err) {
        res.status(500).json({ message: 'Error verifying task', err });
    }
});

//delete task by id
taskRoutes.delete('/:id', async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;  
    try {
        const deletedTask = await Task.findByIdAndDelete(id);
        if (deletedTask) { // Check if task was found and deleted
            res.json({ message: 'Task deleted successfully' });
        } else { // Task not found
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (err) {
        res.status(400).json({ message: err });
    }
});

//add a comment to the task
taskRoutes.post('/:id/comments', async (req: Request, res: Response) => {
    const { id } = req.params
    const { authorId, authorName, authorRole, message } = req.body
    if (!message) return res.status(400).json({ message: "comment message is missing" })
    
    try {
        
        const task = await Task.findById(id) as ITask |null; //find the task id
        if (!task) return res.status(400).json({ message: "Task not found, comment is not added" }); //defensive programming here
        const newComment = {
            authorId,
            authorName,
            authorRole,
            message,
        }

        task.comments.push(newComment)
        await task.save()
        res.status(201).json(task.comments)                    
    } catch (error: any) {
        res.status(500).json({message:"Error adding comment", error: error.message})
    }
})
//claim task
taskRoutes.put('/:id/claim', async (req: Request, res: Response) => {
    const id = req.params.id
    const { userId } = req.body
   
    //find task
    try {
        const task = await Task.findById(id);
        if (!task) //if task not found
            return res.status(404).json({ message: "task not found" });
    
        //to claim a task must be unassigned
        if (task.assignedTo != null)
            return res.status(404).json({ message: "Task cant be claimed, task already taken" });
        //should we check if the child belongs to the family using family code, think about it in the future ??
        //assign the task
        task.assignedTo = userId;
        task.status = 'taken';
        await task.save();

        return res.json({ message: "Task successfully claimed", task });
    } catch (err: any) {
        res.status(500).json({message:"Error trying to claim a task", error:err.message})
    }
})



export default taskRoutes;