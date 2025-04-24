import { prisma } from "../db/index.js";

const findMany = async (mapId) => {
  const scorers = await prisma.scorer.findMany({
    where: {
      mapId: mapId,
    },
    include: {
      map: {
        select: {
          name: true,
          imageUrl: true,
        },
      },
    },
    orderBy: {
      time: "asc",
    },
  });
  return scorers;
};

const destroy = async (scorerId) => {
  const deletedScorer = await prisma.scorer.delete({
    where: {
      id: scorerId,
    },
  });
  return deletedScorer;
};

const create = async (mapId, scorer) => {
  const newScorer = await prisma.scorer.create({
    data: {
      ...scorer,
      mapId: mapId,
    },
  });
  return newScorer;
};

export default { findMany, create, destroy };
