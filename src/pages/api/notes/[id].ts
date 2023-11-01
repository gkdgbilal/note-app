import Note from "@/models/Notes";
import dbConnect from "@/utils/middleware/dbConnect";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();
  const {
    method,
    query: { id },
  } = req;

  if (method === "GET") {
    try {
      const product = await Note.findById(id);
      res.status(200).json(product);
    } catch (error) {
      res.status(400).json({ success: false });
    }
  }

  if (method === "DELETE") {
    try {
      const product = await Note.findByIdAndDelete(id);
      res.status(200).json(product);
    } catch (error) {
      res.status(400).json({ success: false });
    }
  }

  if (method === "PUT") {
    console.log("id", id);

    try {
      const product = await Note.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json(product);
    } catch (error) {
      res.status(400).json({ success: false });
    }
  }
};

export default handler;
