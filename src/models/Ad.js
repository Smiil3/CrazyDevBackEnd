const { PrismaClient } = require("@prisma/client");
const prisma = require("../v1/prisma");

const Ad = {
  create: (data) => prisma.biens.create({ data }),
  findById: (id) => prisma.biens.findUnique({ where: { id: Number(id) } }),
  findByUserId: (userId) =>
    prisma.biens.findMany({ where: { host_id: Number(userId) } }),
  findByEcoZoneId: (ecoZoneId) =>
    prisma.biens.findMany({ where: { ecozone_id: Number(ecoZoneId) } }),
  findByIdAndUser: (id, userId) =>
    prisma.biens.findUnique({
      where: { id: Number(id) },
      select: {
        id: true,
        titre: true,
        description: true,
        prix_par_nuit: true,
        ecozone_id: true,
        type_id: true,
        hosts: {
          select: {
            prenom: true,
            nom: true,
          },
        },
      },
    }),
  update: (id, data) =>
    prisma.biens.update({ where: { id: Number(id) }, data }),
  remove: (id) => prisma.biens.delete({ where: { id: Number(id) } }),
  list: () => prisma.biens.findMany(),
};

module.exports = Ad;
