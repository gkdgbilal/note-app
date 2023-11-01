import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { User } from "./user";
import { sessionOptions } from "@/utils/lib/session";

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  const { username } = await req.body;

  try {
    const {
      data: { login },
    } = await axios.post("/api/login", { username });

    const user: User = {
      isLoggedIn: true,
      login,
    };
    req.session.user = user;
    await req.session.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

export default withIronSessionApiRoute(loginRoute, sessionOptions);
