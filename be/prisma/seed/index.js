const { PrismaClient, RuleEntityType } = require('@prisma/client');
const cities = require('./data/cities.json');

const prisma = new PrismaClient();

const seed = async () => {
  const citiesPromise = cities.map((city) => (
    prisma.city.upsert({
      where: { code: city.code },
      update: {},
      create: {
        name: city.name,
        code: city.code,
        areas: {
          createMany: {
            data: city.areas.map((area) => ({
              name: area.name
            }))
          }
        }
      }
    })
  ));

  const citiesArray = await Promise.all(citiesPromise);

  for (const city of citiesArray) {
    await prisma.rule.create({
      data: {
        name: `${city.name} general rule`,
        entityId: city.id,
        entityType: RuleEntityType.CITY,
        rule: { type: 'GENERAL', price: 2 }
      }
    });
  }
};

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    // eslint-disable-next-line no-console
    console.error(error);
    await prisma.$disconnect();
  });