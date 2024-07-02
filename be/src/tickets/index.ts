import { Router } from "express";
import { getDatabase } from "../database/getDatabase";
import { RuleEntityType, TicketStatus } from "@prisma/client";
import moment from "moment";

enum RuleType {
  GENERAL = 'GENERAL',
  TIME = 'TIME'
};

const ticketsRouter = Router();

ticketsRouter.get('/cities/:cityId/areas/:areaId', async (req, res) => {
  const db = getDatabase();

  const { cityId, areaId } = req.params;

  const [cityRules, areaRules] = await Promise.all([
    db.rule.findMany({ where: { entityId: +cityId, entityType: RuleEntityType.CITY } }),
    db.rule.findMany({ where: { entityId: +areaId, entityType: RuleEntityType.AREA } }),
  ]);

  res.send({
    cityRules,
    areaRules
  });
});

ticketsRouter.post('/areas/:areaId/start', async (req, res) => {
  const db = getDatabase();

  const { areaId } = req.params;
  const { carId, userId } = req.body;
  console.log(req.body);

  const ticket = await db.ticket.create({ data: { areaId: +areaId, carId, userId }});

  res.send(ticket);
});

ticketsRouter.post('/:ticketId/stop', async (req, res) => {
  const db = getDatabase();

  const { ticketId } = req.params;
  const now = moment();

  const ticket = await db.ticket.findFirstOrThrow({ where: { id: +ticketId }, include: { area: true } });

  const { areaId } = ticket;
  const { cityId } = ticket.area;

  const [cityRules, areaRules] = await Promise.all([
    db.rule.findMany({ where: { entityId: +cityId, entityType: RuleEntityType.CITY } }),
    db.rule.findMany({ where: { entityId: +areaId, entityType: RuleEntityType.AREA } }),
  ]);

  const rulesMap: Map<RuleType, any> = new Map();

  for (const rule of cityRules) {
    rulesMap.set((rule.rule as any)?.type as RuleType, rule.rule);
  }

  for (const rule of areaRules) {
    rulesMap.set((rule.rule as any)?.type as RuleType, rule.rule);
  }

  const parkingDuration = moment.duration(now.diff(moment(ticket.createdAt)));
  // Duration will be ceiled to one hour precesion
  const duration = Math.ceil(parkingDuration.asHours());

  // TODO: Implement correct rules application

  const updatedTicket = await db.ticket.update({
    where: { id: ticket.id },
    data: { status: TicketStatus.FINISHED, totalPrice: duration * rulesMap.get(RuleType.GENERAL).price, finishedAt: now.toISOString() }
  });

  res.send(updatedTicket);
});

export default ticketsRouter;
