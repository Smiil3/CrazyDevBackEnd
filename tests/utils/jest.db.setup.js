const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

if (process.env.NODE_ENV !== "test") {
  throw new Error("Refusing to run DB cleanup because NODE_ENV !== test");
}

async function assertTestDatabase() {
  const rows = await prisma.$queryRaw`SELECT DATABASE() AS db`;
  const dbName = rows?.[0]?.db;
  if (!dbName || !/-test$|_test$/.test(dbName)) {
    throw new Error(
      `Refusing to truncate non-test database: ${dbName || "(unknown)"}`,
    );
  }
}
const PROTECTED_TABLES = new Set(["biens_ecozone", "biens_type"]);

async function truncateAllTables() {
  await assertTestDatabase();

  const tables = await prisma.$queryRawUnsafe(`
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = DATABASE()
      AND table_type = 'BASE TABLE'
      AND table_name NOT IN ('_prisma_migrations');
  `);

  await prisma.$executeRawUnsafe("SET FOREIGN_KEY_CHECKS=0;");
  for (const t of tables) {
    const name = t.table_name || t.TABLE_NAME;
    if (name && !PROTECTED_TABLES.has(name)) {
      await prisma.$executeRawUnsafe("TRUNCATE TABLE `" + name + "`;");
    }
  }
  await prisma.$executeRawUnsafe("SET FOREIGN_KEY_CHECKS=1;");
}
beforeEach(async () => {
  await truncateAllTables();
});
afterAll(async () => {
  await prisma.$disconnect();
});

global.db = { prisma, truncateAllTables };
