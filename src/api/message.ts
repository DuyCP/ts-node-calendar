import express from "express";
import { handleEvents } from "../service";
import { MattermostService } from "../service/mattermost";
const router = express.Router();

type MessageResponse = string;

router.get<{}, MessageResponse>("/", (req, res) => {
  res.json("Hello Messages");
});

router.get<{}, MessageResponse>("/posts", (req, res) => {
  res.json("Get all Posts");
});

// router.post<{}, MessageResponse>("/", async (req, res) => {
//   const { receiverEmail } = req.body;

//   // Assuming MeetingResponse interface has 'success' and 'data' properties
//   const response: {
//     success: boolean;
//     data: any;
//   } = {
//     success: true,
//     data: { receiverEmail },
//   };

//   try {
//     await handleEvents(receiverEmail);
//   } catch (error) {
//     console.log("🚀 ~ router.post<{},MeetingResponse> ~ error:", error);
//     console.log(JSON.parse((error as any).message));

//     // res.json(JSON.apJSON.stringify(error));
//     res.json(JSON.parse((error as any).message));
//   }
//   // Send back the response
//   res.json(response as any);
// });

export default router;
