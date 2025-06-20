import express from "express";
import cors from "cors";

import prisma from "../db/db";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/user", async (req, res) => {
  // const { id, email, firstName, lastName } = req.body;
  const data = req.body;

  try {
    const email = data.data.email_addresses[0]?.email_address || null;
    const username = data.data.username || null;
    const firstName = data.data.first_name || null;
    const lastName = data.data.last_name || null;
    const id = data.data.id;

    const newUser = await prisma.user.create({
      data: {
        id,
        last_name: lastName,
        first_name: firstName,
        username,
        email,
      },
    });

    console.log(newUser);

    res
      .status(200)
      .json({ message: "User saved successfully.", code: 200, data: null });
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).send("Error saving user.");
  }
});
