"use server"; // Instructs Next.js to compile this entire file to execute ONLY on the server

import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function registerUser(formData) {
  try {
    // 1. Establish connection with your live MongoDB Atlas cluster
    await connectToDatabase();

    const { nid, name, email, contact, password } = formData;

    // 2. Business Logic Validation: Check if a user with this email already exists
    const existingEmail = await User.findOne({ email: email.toLowerCase() });
    if (existingEmail) {
      return {
        success: false,
        error: "An account with this email address already exists.",
      };
    }

    // 3. Business Logic Validation: Check if a user with this NID card already exists
    const existingNID = await User.findOne({ nid });
    if (existingNID) {
      return {
        success: false,
        error: "An account with this NID number already exists.",
      };
    }

    // 4. Secure Cryptographic Hashing
    // Generates a secure salt and combines it with the plain text password so it can't be reverse-engineered
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 5. Save the data document into your MongoDB User collection
    const newUser = new User({
      name,
      nid,
      email: email.toLowerCase(),
      contact,
      password: hashedPassword, // Store the encrypted string, NOT the plain text password
    });

    await newUser.save();

    console.log(`👤 New User Registered Successfully in DB: ${email}`);

    return { success: true };
  } catch (error) {
    console.error("Registration server action error:", error);
    return {
      success: false,
      error: "Internal server error. Please try again later.",
    };
  }
}

export async function loginUser(formData) {
  try {
    // 1. Establish database connection
    await connectToDatabase();

    const { email, password } = formData;

    // 2. Look up the user by email address
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return { success: false, error: "Invalid email address or password." };
    }

    // 3. Compare the typed password with the encrypted hash inside MongoDB
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return { success: false, error: "Invalid email address or password." };
    }

    console.log(`🔑 Real Login Verified Successfully for: ${user.email}`);

    // Return user data back to the client component (omitting the password string for security)
    return {
      success: true,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  } catch (error) {
    console.error("Login server action error:", error);
    return {
      success: false,
      error: "Internal server error. Please try again later.",
    };
  }
}
