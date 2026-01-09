import Session from "../models/Session.js";
import User from "../models/User.js";
import { generatetoken } from "../utils/tokens.js";

export const refresh = async (req, res) => {
  const refreshToken = req.cookies.refreshtoken;

  if (!refreshToken) return res.status(401).json({});

  const session = await Session.findOne({ refreshToken });

  if (!session || session.expiresAt < Date.now()) {
    return res.status(401).json({});
  }

  const user = await User.findById(session.userId);
  const newAccessToken = generatetoken(user);

  res.cookie("accessToken", newAccessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 15 * 60 * 1000
  });

  res.json({ success: true });
};
