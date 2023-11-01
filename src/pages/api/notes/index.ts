import dbConnect from "@/utils/middleware/dbConnect";
import Note from "@/models/Notes";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();
  const { method } = req;

  if (method === "GET") {
    try {
      const notes = await Note.find({});
      res.status(200).json({ success: true, data: notes });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  }

  if (method === "POST") {
    try {
      const newNote = await Note.create(req.body);
      res.status(201).json({ success: true, data: newNote });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  }
};

export default handler;
