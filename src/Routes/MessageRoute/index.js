import { Router } from "express";
import messageController from "../../Controllers/Message/index.js";
const messageRouter = Router();
messageRouter.get("/GetAllMessages", messageController.getAll);
messageRouter.get("/GetMessage/:id", messageController.getSingle);
messageRouter.post("/AddMessage", messageController.create);
messageRouter.delete("/DropMessage/:id", messageController.Delete);

export default messageRouter