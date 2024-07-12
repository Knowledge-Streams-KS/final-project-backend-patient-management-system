import MessageModel from "../../Model/MessageModel/index.js"

const messageController = {
    getAll: async(req,res) => {
        try {
            const findAllMessages = await MessageModel.findAll();
            if(!findAllMessages) {
                return res.status(404).json({Warning : "Messages not found"})
            }
            res.status(200).json({success: "Record of message found successfully"})
        } catch (error) {
           res.status(500).json({Error: "Internal server error"}) 
        }
    },
    getSingle : async(req,res) => {
        try {
            const {id} = req.params;
            const findMessage = await MessageModel.findByPk(id);
            if(!findMessage) {
                return res.status(404).json({Warning: `Message against this id ${id} is not found`})
            }
            res.status(200).json({success: "Found Message data"})
            
        } catch (error) {
            res.status(500).json({Error: "Internal server error"}) 
        }
    },
    create : async(req,res) => {
     try {
        const {message,firstName,lastName,email} = req.body;
        if(!message || !firstName|| !lastName|| !email){
          return res.status(400).json({Alert : "Fill All fields"})
        }
        const AddMessage = await MessageModel.create({
            message,
            firstName,
            lastName,
            email
        })

        if(!AddMessage) {
            return res.status(404).json({warning : "Not found"})
        }
        res.status(200).json({success : "Add message successfully", MessageBox : AddMessage})
     } catch (error) {
        res.status(500).json({Error: "Internal server Error"})
     }
        
    },
    Delete : async(req,res) => {
      try {
        const {id} = req.params;
      const dropMessage = await MessageModel.destroy({
        where : {
            id : id
        }
      })
      if(dropMessage == -1) {
        return res.status(404).json({Warning : `Cannot drop message against this id :  ${id}`})
      }
      res.status(200).json({success: "Successfully dropped the message", DropMessage: dropMessage})
      } catch (error) {
        res.status(500).json({Error: "Internal server Error"})
      }
    }

}
export default messageController