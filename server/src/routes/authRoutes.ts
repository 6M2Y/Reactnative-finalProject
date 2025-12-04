import express from 'express';
import { User } from '../models/userModel';

const authRoutes = express.Router();

//register parents and children, role based registration
///children registration happens with familycode
authRoutes.post('/register', async (req, res) => {
    const { name, email, password, role, familyCode } = req.body; 
    try {
        //valideate input 
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Please enter all fields' });
        }
        //if role isnot selected
        if (!role)
            return res.status(400).json({message:'Please select you role: parent or child'})
            //check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        let newFamilyCode = familyCode;
        if (role === "parent")
        {
            //create familycode
            newFamilyCode = Math.random().toString(36).substring(2, 8).toUpperCase(); 
        }
        else if (role === "child") {
            const parent = await User.findOne({ familyCode })
            if (!parent) //if parent doesnt exists
            {
                return res.status(400).json({message:'Invalid familycode. Parent not found'})
                }
        }
        //create new user
        const newUser = new User({
            name,
            email,
            password,
            role,
            familyCode: newFamilyCode
        });
        await newUser.save(); //save user to database
        res.status(201).json({ message: 'User registered successfully' });
    }
    catch (error: any) {
        res.status(500).json({
            message: 'Server error',
            error: error.message,
         });
    }
});

//login user
authRoutes.post('/login', async (req, res) => {
    const { email, passord } = req.body;
    
    try {
        //validate input
        if (!email || !passord) {
           
            return res.status(400).json({ message: 'Please enter all fields' });
        }
        //check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials. no user found' });
        }
        
        //check password
        const isMatch = await user.comparePassword(passord);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials. Mismatch passord' + passord + '!=' + user.password });
        }
        //create and assign token
        const token = user.generateAuthToken(); // Generate auth token
        await user.save();
         
        res.status(200).json({
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                familyCode: user.familyCode,
                point: user.points
            }
        });
        console.log(`Login success for: ${user.email}`);
    } catch (error: any) {
        res.status(500).json({
            message: 'Server error',
            error: error.message,
        });
    }   
});



export default authRoutes;
