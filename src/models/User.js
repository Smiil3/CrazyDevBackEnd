const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const User = {
  create: (data) => prisma.host.create({ data }),
  findByEmail: (email) => prisma.host.findUnique({ where: { email } }),
  findById: (id) => prisma.host.findUnique({ where: { id: Number(id) } }),
  update: (id, data) => prisma.host.update({ where: { id: Number(id) }, data }),
  remove: (id) => prisma.host.delete({ where: { id: Number(id) } }),

  list: () => prisma.host.findMany(),
};

module.exports = User;
