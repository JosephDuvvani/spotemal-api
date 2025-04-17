import { prisma } from "../db/index.js";

const start = async (mapId) => {
  const game = await prisma.game.create({
    data: {
      mapId,
      spotted: [],
      start: new Date(),
    },
    include: {
      map: {
        include: {
          targets: true,
        },
      },
    },
  });
  return game;
};

const end = async (gameId) => {
  const game = await prisma.game.update({
    where: {
      id: gameId,
    },
    data: {
      end: new Date(),
    },
    select: {
      start: true,
      end: true,
    },
  });
  return game;
};

const destroy = async (gameId) => {
  await prisma.game.delete({
    where: {
      id: gameId,
    },
  });
};

const spot = async (gameId, spots) => {
  const { spotted } = await prisma.game.update({
    where: {
      id: gameId,
    },
    data: {
      spotted: spots,
    },
    select: {
      spotted: true,
    },
  });
  return spotted;
};

const find = async (id) => {
  const game = await prisma.game.findUnique({
    where: {
      id,
    },
    include: {
      map: {
        include: {
          targets: true,
        },
      },
    },
  });
  return game;
};

export default { start, spot, end, find, destroy };
