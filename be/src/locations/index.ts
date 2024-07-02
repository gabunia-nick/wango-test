import { Router } from "express";
import { getDatabase } from "../database/getDatabase";

const locationsRouter = Router();

locationsRouter.get('/cities', async (_, res) => {
  const db = getDatabase();

  res.send(await db.city.findMany());
});

locationsRouter.get('/cities/:cityId/areas', async (req, res) => {
  const db = getDatabase();

  const { cityId } = req.params;

  res.send(await db.area.findMany({ where: { cityId: +cityId } }));
});

export default locationsRouter;
