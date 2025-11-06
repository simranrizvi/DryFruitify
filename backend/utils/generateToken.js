import jwt from "jsonwebtoken";

const generateToken = (res, user) => {
  const token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE || "7d",
    }
  );

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // ✅ only true on Render
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // ✅ important
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

export default generateToken;
