import User from "@/module/User";
import connectDB from "@/config/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const { username, email, password, confirmPassword } = await req.json();
  if (password !== confirmPassword) {
    return new NextResponse(
      JSON.stringify({ error: "Passwords dosent match" }, { status: 400 })
    );
  }
  await connectDB();
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return new NextResponse(
      JSON.stringify({ error: "User already exists" }, { status: 400 })
    );
  }

  const hashedPass = await bcrypt.hash(password, 10);
  const newUser = new User({ username, email, password: hashedPass });

  try {
    await newUser.save();
    return new NextResponse("User succesFully register", { status: 201 });
  } catch (error) {
    return new NextResponse(error, { status: 500 });
  }
};
