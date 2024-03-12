import express from "express";
import { handleEvents } from "../service";

const router = express.Router();

type MeetingResponse = string;

router.get<{}, MeetingResponse>("/", (req, res) => {
  res.json("Hello Meettings");
});

router.post<{}, MeetingResponse>("/summary", async (req, res) => {
  const { text, receiverEmail } = req.body; // Assuming the request body contains a 'text' property
  console.log("🚀 ~ text:", text);

  // Assuming MeetingResponse interface has 'success' and 'data' properties
  const response: {
    success: boolean;
    data: any;
  } = {
    success: true,
    data: { text, receiverEmail },
  };

  await handleEvents(receiverEmail);
  // Send back the response
  res.json(response as any);
});

export default router;
