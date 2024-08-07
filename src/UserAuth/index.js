import UserModel from "../Model/UserModel/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import PatientModel from "../Model/PatientModel/index.js";
import DoctorModel from "../Model/DoctorModel/index.js";
let key = process.env.secret_key;

const userAuthController = {
  SignUp: async (req, res) => {
    try {
      const { name, email, role, password, confirmPassword, PatientName, DateOfBirth, gender, address, medicalHistory, DoctorName, Specialization } = req.body;

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
      const hashedPassword = await bcrypt.hash(password, 10);

      // Creating user with hashed password
      const user = await UserModel.create({
        name,
        email,
        role,
        password: hashedPassword,
        confirmPassword: hashedPassword // This might not be necessary; consider removing it if not used
      });

      if (role === 'patient') {
        const patient = new PatientModel({
          PatientName,
          DateOfBirth,
          gender,
          address,
          medicalHistory
        });
        await patient.save();
        user.PatientId = patient._id; // Assuming you're storing the patient ID in the user document
        await user.save();
      }

      if (role === 'doctor') {
        const doctor = new DoctorModel({
          DoctorName,
          Specialization
        });
        await doctor.save();
        user.DoctorId = doctor._id; // Assuming you're storing the doctor ID in the user document
        await user.save();
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
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      const tokenData = {
        id: user.id,
        email: user.email,
        role: user.role
      };
  
      const token = jwt.sign(tokenData, key, { expiresIn: '2h' });
      res.status(200).json({ message: "Login successful", token });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  GetUserDetails: async (req, res) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      if (!token) {
        return res.status(403).json({ message: 'No token provided.' });
      }

      jwt.verify(token, key, async (err, decoded) => {
        if (err) {
          return res.status(500).json({ message: 'Failed to authenticate token.' });
        }

        const user = await UserModel.findByPk(decoded.id);
        if (!user) {
          return res.status(404).json({ message: 'User not found.' });
        }

        res.status(200).json({ user });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  }
};

export default userAuthController;
