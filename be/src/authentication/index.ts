import { Router } from "express";
import { getDatabase } from "../database/getDatabase";

const authRouter = Router();

authRouter.post('/register', async (req, res) => {
  const db = getDatabase();

  const {
    firstName,
    lastName,
    email,
    plate
  } = req.body;

  const user = await db.user.create({ data: {
    firstName,
    lastName,
    email
  }});

  const car = await db.car.create({ data: {
    userId: user.id,
    plate
  }});

  res.send(Object.assign(user, { car }));
});

authRouter.post('/login', async (req, res) => {
  const db = getDatabase();

  const { email } = req.body;

  const user = await db.user.findFirstOrThrow({ where: { email }});

  const car = await db.car.findFirstOrThrow({ where: { userId: user.id }})

  res.send(Object.assign(user, { car }));
});

export default authRouter;
