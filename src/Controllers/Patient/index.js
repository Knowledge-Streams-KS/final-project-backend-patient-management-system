import PatientModel from "../../Model/PatientModel/index.js";
import UserModel from "../../Model/UserModel/index.js";

const PatientController = {
  getAll: async (req, res) => {
    try {
      const findAll = await PatientModel.findAll({
        include: [
          {
            model: UserModel,
            attributes: ['name', 'email'],
          },
        ],
      });
      res.status(200).json({ success: "Data of Patients found", PatientRecord: findAll });
    } catch (error) {
      res.status(500).json({ Error: "Internal server Error" });
    }
  },
  getSingle: async (req, res) => {
    try {
      const { id } = req.params;
      const findSinglePatient = await PatientModel.findByPk(id);
      if (!findSinglePatient) {
        return res.status(404).json({ Warning: `Patient against this id ${id} is not found` });
      }
      res.status(200).json({ success: `Patient against this id ${id} is successfully found`, patient: findSinglePatient });
    } catch (error) {
      res.status(500).json({ Error: "Internal server Error" });
    }
  },
  create: async (req, res) => {
    const { PatientName, DateOfBirth, gender, address, userName, email, password } = req.body;

    try {
      // Validate required fields
      if (!PatientName || !DateOfBirth || !gender || !address || !userName || !email || !password) {
        return res.status(400).json({ Error: "Please provide all required fields" });
      }

      // Create new user record
      const newUser = await UserModel.create({
        name: userName,
        email,
        password,
      });

      // Create new patient record and associate with user
      const newPatient = await PatientModel.create({
        PatientName,
        DateOfBirth,
        gender,
        address,
        UserId: newUser.id, // Set UserId in patient model
      });

      res.status(201).json({ success: "Patient and User created successfully", patient: newPatient, user: newUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ Error: "Internal server Error" });
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const dropPatient = await PatientModel.destroy({
        where: {
          id,
        },
      });
      if (dropPatient == 0) {
        return res.status(404).json({ Warning: `Patient against this id ${id} cannot be found` });
      }
      res.status(200).json({ success: "Patient Record Dropped successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ Error: "Internal server Error" });
    }
  },
};

export default PatientController;
