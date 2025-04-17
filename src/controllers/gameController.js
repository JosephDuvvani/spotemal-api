import models from "../models/index.js";
import { verifyPosition } from "../utils/utils.js";

const startGamePost = async (req, res) => {
  const { mapId } = req.body;

  try {
    const map = await models.Map.find(mapId);

    if (!map) return res.status(404).json({ error: { msg: "Map Not Found" } });

    const game = await models.Game.start(mapId);

    res.json({ game });
  } catch (err) {
    res.status(500).json({ error: { msg: "Server Error" } });
  }
};

const spotTargetPost = async (req, res) => {
  const { gameId } = req.params;
  const { targetId, position, mapSize } = req.body;

  try {
    const game = await models.Game.find(gameId);

    if (!game)
      return res.status(404).json({ error: { msg: "Game Not Found" } });

    //verify target
    const targets = game.map.targets;
    const target = targets.filter((t) => t.id === targetId);

    if (target.length === 0)
      return res.status(404).json({ error: { msg: "Target Not Found" } });

    if (game.spotted.includes(targetId))
      return res.json({ verified: false, msg: "Already Spotted" });

    const isTarget = verifyPosition(target[0].position, position, mapSize);

    if (!isTarget) return res.json({ verified: false, msg: "Missed" });

    const spotted = await models.Game.spot(gameId, [...game.spotted, targetId]);

    if (spotted.length === targets.length) {
      const time = await models.Game.end(gameId);

      await models.Game.destroy(gameId);

      return res.json({ verified: true, spotted, time, msg: "Game Over" });
    }

    res.json({ verified: true, spotted });
  } catch (err) {
    res.status(500).json({ error: { msg: "Server Error" } });
  }
};

const endGamePost = async (req, res) => {
  const { gameId } = req.params;

  try {
    const game = await models.Game.find(gameId);

    if (!game)
      return res.status(404).json({ error: { msg: "Game Not Found" } });

    const time = await models.Game.end(gameId);

    await models.Game.destroy(gameId);

    res.json({ time, msg: "Game Ended" });
  } catch (err) {
    res.status(500).json({ error: { msg: "Server Error" } });
  }
};

export { startGamePost, spotTargetPost, endGamePost };
