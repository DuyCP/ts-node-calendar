import express from "express";
import { handleEvents } from "../service";

const router = express.Router();

type MeetingResponse = string;

router.get<{}, MeetingResponse>("/", (req, res) => {
  res.json("Hello Meettings");
});

router.post<{}, MeetingResponse>("/summary", async (req, res) => {
  const { receiverEmail } = req.body;

  // Assuming MeetingResponse interface has 'success' and 'data' properties
  const response: {
    success: boolean;
    data: any;
  } = {
    success: true,
    data: { receiverEmail },
  };

  await handleEvents(receiverEmail);
  // Send back the response
  res.json(response as any);
});

export default router;
