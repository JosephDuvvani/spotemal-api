import { prisma } from "../db/index.js";

const find = async (id) => {
  const target = await prisma.target.findUnique({
    where: {
      id,
    },
    select: {
      position: true,
      mapId: true,
    },
  });
  return target;
};

export default { find };
