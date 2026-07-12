"use server"; // Instructs Next.js to compile this entire file to execute ONLY on the server

import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers"; // Cookie utility import

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
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 5. Save the data document into your MongoDB User collection
    const newUser = new User({
      name,
      nid,
      email: email.toLowerCase(),
      contact,
      password: hashedPassword,
    });

    await newUser.save();

    console.log(`👤 New User Registered Successfully in DB: ${email}`);

    // Create user object context data structure
    const userData = {
      id: newUser._id.toString(),
      name: newUser.name,
      email: newUser.email,
      role: newUser.role || "user",
    };

    // 6. Automatically log the user in immediately following registration
    const cookieStore = await cookies();
    cookieStore.set("session_user", JSON.stringify(userData), {
      httpOnly: true, // Prevents client-side JS scripts from accessing it (Secure against XSS)
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 Week lifespan
      path: "/",
    });

    return {
      success: true,
      user: userData, // Returning user profile details back to the client matching login action standard
    };
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

    const userData = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    };

    // 4. Set the session cookie right BEFORE returning success
    const cookieStore = await cookies();
    cookieStore.set("session_user", JSON.stringify(userData), {
      httpOnly: true, // Prevents client-side JS scripts from accessing it (Secure against XSS)
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 Week lifespan
      path: "/",
    });

    // Return sanitized data object structure
    return {
      success: true,
      user: userData,
    };
  } catch (error) {
    console.error("Login server action error:", error);
    return {
      success: false,
      error: "Internal server error. Please try again later.",
    };
  }
}

// 🌟 ADDED: LOGOUT ACTION TO AUTOMATICALLY WIPE COOKIES 🌟
export async function logoutUser() {
  try {
    const cookieStore = await cookies();
    // This tells the browser to instantly drop the cookie from storage
    cookieStore.delete("session_user");
    console.log("🚪 Session user cookie cleared safely from server.");
    return { success: true };
  } catch (error) {
    console.error("Logout server action error:", error);
    return { success: false, error: "Failed to log out correctly." };
  }
}
