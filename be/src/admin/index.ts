import { Router } from "express";
import { getDatabase } from "../database/getDatabase";

const adminRouter = Router();

adminRouter.post('/cities', async (req, res) => {
  const db = getDatabase();
  const { name, code } = req.body;

  const city = await db.city.create({ data: { name, code } });

  res.send(city);
});

adminRouter.post('/cities/:cityId/areas', async (req, res) => {
  const db = getDatabase();

  const { cityId } = req.params;
  const { name } = req.body;

  const area = await db.area.create({ data: { cityId: +cityId, name }});

  res.send(area);
});

adminRouter.post('/rules', async (req, res) => {
  const db = getDatabase();

  const { name, rule, entityId, entityType } = req.body;

  const area = await db.rule.create({
    data: {
      entityId: +entityId,
      entityType,
      name,
      rule
    }
  })

  res.send(area);
});

export default adminRouter;
