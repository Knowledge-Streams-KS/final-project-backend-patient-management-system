import { compare, hash } from "bcrypt";
import UserModel from "../Model/UserModel/index.js";
import PatientModel from "../Model/PatientModel/index.js";
import DoctorModel from "../Model/DoctorModel/index.js";
import jwt from 'jsonwebtoken';
let key = process.env.secret_key
const userAuthController = {
    SignUp: async (req, res) => {
        try {
            const { name, email, role, password, confirmPassword, phoneNo } = req.body;

            // Check if email already exists 
            const userCheck = await UserModel.findOne({ where: { email: email } });
            if (userCheck) {
                return res.status(401).json({ Warning: `${email} already exists` });
            }

            // Matching password with confirm password
            if (password !== confirmPassword) {
                return res.status(400).json({ Warning: 'Passwords must match' });
            }

            // Hash the password
            const hashedPassword = await hash(password, 10);

            // Creating user with hashed password
            const user = await UserModel.create({
                name,
                email,
                role,
                password: hashedPassword,
                confirmPassword: hashedPassword,
                phoneNo
            });
            console.log(user);

            // Create user -> patient entry
            if (role === 'patient') {
                await PatientModel.create({ userId: user.id });
            } else if (role === 'doctor') {
                await DoctorModel.create({ userId: user.id });
            }

            return res.status(201).json({ message: "Registered successfully", data: user });
        } catch (error) {
            res.status(500).json({ Error: "Internal server error" });
            console.log(error);
        }
    },

    SignIn: async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await UserModel.findOne({ where: { email: email } });
            if (!user) {
                return res.status(400).json({ Warning: `Invalid credentials` });
            }

            // Checking password
            const isPasswordValid = await compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(400).json({ message: "Invalid credentials" });
            }

            const tokenData = {
                id: user.id,
                email: user.email,
                role: user.role,
                phoneNo: user.phoneNo // Ensure this matches the model
            };

            // Generate JWT token
            const token = jwt.sign(tokenData, key, { expiresIn: '2h' });
            res.status(200).json({ message: "Login successful", token });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
};

export default userAuthController;
