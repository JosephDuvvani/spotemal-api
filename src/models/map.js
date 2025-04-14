import { prisma } from "../db/index.js";

const findMany = async () => {
  const maps = await prisma.map.findMany();
  return maps;
};

const find = async (id) => {
  const map = await prisma.map.findUnique({
    where: {
      id,
    },
    include: {
      targets: true,
    },
  });
  return map;
};

export default { findMany, find };
