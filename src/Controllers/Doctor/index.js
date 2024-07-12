import DoctorModel from "../../Model/DoctorModel/index.js"

const DoctorController = {
  getAll: async (req, res) => {
    try {
      const getAllDoctors = await DoctorModel.findAll();
      res.status(200).json({ success: "GetAll Doctors", DoctorRecord: getAllDoctors });
    } catch (error) {
      res.status(500).json({ Error: "Internal server error" });
    }
  },
  getSingle: async (req, res) => {
    try {
      const { id } = req.params;
      const findSingleDoctor = await DoctorModel.findByPk(id);
      if (!findSingleDoctor) {
        return res.status(404).json({ Warning: `cannot found doctor against this id ${id}` });
      }
      res.status(200).json({ success: "Find Record of Doctor", Doctor: findSingleDoctor });
    } catch (error) {
      res.status(500).json({ Error: "Internal server error" });
    }
  },
  create: async (req, res) => {
    try {
      const { DoctorName, Specialization } = req.body;
      
      // Validate required fields
      if (!DoctorName || !Specialization) {
        return res.status(400).json({ Error: "Please provide DoctorName and Specialization" });
      }

      const AddDoctors = DoctorModel.build({
        DoctorName: DoctorName,
        Specialization: Specialization
      });
      
      await AddDoctors.save();
      console.log("body => ", req.body);
      res.status(200).json({ success: "Add doctor to record successfully", DoctorRecord: AddDoctors });
    } catch (error) {
      res.status(500).json({ Error: "Internal server error" });
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const dropDoctorRecord = await DoctorModel.destroy({
        where: {
          id: id
        }
      });
      if (dropDoctorRecord === 0) {
        return res.status(404).json({ Warning: `cannot drop the Record against this id ${id}` });
      }
      res.status(200).json({ success: "Dropped successfully", DropDoctorRecord: dropDoctorRecord });
    } catch (error) {
      res.status(500).json({ Error: "Internal server error" });
    }
  }
}

export default DoctorController;
