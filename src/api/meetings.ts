import express from "express";
import { handleEvents } from "../service";

const router = express.Router();

type MeetingResponse = string;

router.get<{}, MeetingResponse>("/", (req, res) => {
  res.json("Hello Meettings");
});

function throwError(str: string) {
  throw new Error(JSON.stringify({ message: str }));
}

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

  try {
    await handleEvents(receiverEmail);
  } catch (error) {
    console.log("🚀 ~ router.post<{},MeetingResponse> ~ error:", error);
    console.log(JSON.parse((error as any).message));

    // res.json(JSON.apJSON.stringify(error));
    res.json(JSON.parse((error as any).message));
  }
  // Send back the response
  res.json(response as any);
});

export default router;
