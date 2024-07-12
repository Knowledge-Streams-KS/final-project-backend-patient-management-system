import PatientModel from "../../Model/PatientModel/index.js"

const PatientController = {
    getAll : async (req,res) => {
       try {
        const findAll = await PatientModel.findAll();
        res.status(200).json({success: "Data of Patients found", PatientRecord: findAll})
       } catch (error) {
        res.status(500).json({Error:"Internal server Error"})
       }
    },
    getSingle: async(req,res)=>
    {
        try {
            const {id} = req.params
            const findSinglePatient = await PatientModel.findByPk(id);
            if(!findSinglePatient){
                return res.status(404).json({Warning : `Patient against this id ${id} is not found`})
            }
            res.status(200).json({success : `Pateint against this id ${id} is successfully found`})
        } catch (error) {
            res.status(500).json({Error:"Internal server Error"})  
        }

    },
    create: async (req, res) => {
        const { PatientName, DateOfBirth, gender, medicalHistory,address} = req.body;

        try {
            // Validate required fields
            if (!PatientName || !DateOfBirth || !gender || !address) {
                return res.status(400).json({ Error: "Please provide name, date of birth, and gender" });
            }

            // Create new patient record
            const newPatient = PatientModel.build({
                PatientName,
                DateOfBirth,
                gender,
                medicalHistory,
                address
              });
            await newPatient.save()
            res.status(201).json({ success: "Patient created successfully", patient: newPatient });
        } catch (error) {
            console.error(error);
            res.status(500).json({ Error: "Internal server Error" });
        }
    },
    delete : async(req,res)=>{
        try {
            const {id} = req.params
            const dropPatient = await PatientModel.destroy({
                where : 
                {
                    id : id
                }
            })
            if(dropPatient == -1) {
                return res.status(404).json({Warning : `Patient against this id ${id} cannot be found`})
            }
         res.status(200).json({sucess: "Patient Record Dropped successfully"})
            
        } catch (error) {
            console.error(error);
            res.status(500).json({ Error: "Internal server Error" });
        }
    }
}

export default PatientController