import expres, { Request, Response } from 'express';
import multer from 'multer';
import { Task } from '../models/Task';


const upLoadRouter = expres.Router()

//configure multer
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        cb(null,Date.now() + '-' + file.originalname)
    }
})

const upload = multer({ storage })

//upload proof image for a task by taskId 
//endpoint: /api/upload/upload-proof/:taskId
upLoadRouter.post('/upload-proof/:taskId', upload.single('proof'), async (req:Request, res: Response) => {
    try {
        if (!req.file) {
            return res.status(403).json({message:'No uploaded image'})
        }

        const taskId = req.params.taskId;
        console.log('Task ID:', taskId);  // Debugging line
        const PUBLIC_URL  = process.env.PUBLIC_URL || 'http://localhost:4000';
        
        if (!PUBLIC_URL) {
            // Safety check if the environment variable is missing
            return res.status(500).json({ message: 'Server configuration error: PUBLIC_URL not defined.' });
        }
        const url = `${PUBLIC_URL}/uploads/${req.file.filename}`
        const updated = await Task.findByIdAndUpdate(taskId, { proofImg: url }, { new: true })
        // Return the updated img
        res.json({message:'Image uploaded successfully', proofImg:updated?.proofImg})
    } catch (error:any) {
        res.status(500).json({message:"something went wrong", error: error.message})
    }
})

export default upLoadRouter;