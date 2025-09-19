const { PrismaClient } = require("@prisma/client");

let prisma;
if (process.env.NODE_ENV === "test") {
  // When jest reloads modules, avoid creating multiple clients.
  if (!global.__PRISMA__) global.__PRISMA__ = new PrismaClient();
  prisma = global.__PRISMA__;
} else {
  prisma = new PrismaClient();
}

module.exports = prisma;
