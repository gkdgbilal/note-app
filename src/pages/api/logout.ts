import { sessionOptions } from "@/utils/lib/session";
import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";

function logoutRoute(req: NextApiRequest, res: NextApiResponse) {
  req.session.destroy();
  res.json({ isLoggedIn: false, login: "" });
}

export default withIronSessionApiRoute(logoutRoute, sessionOptions);
