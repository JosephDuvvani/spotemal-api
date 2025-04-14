import models from "../models/index.js";
import { verifyPosition } from "../utils/utils.js";

const verifyTargetPost = async (req, res) => {
  const { targetId } = req.params;
  const { mapId, mapSize, position } = req.body;

  if (!mapId || !mapSize || !position)
    res.status(400).json({
      error: { msg: "Target Information Required: mapId, mapSize, position" },
    });

  try {
    const data = await models.Target.find(targetId);

    if (!data) res.status(404).json({ error: { msg: "Target Not Found" } });

    if (data.mapId !== mapId)
      res.status(400).json({ error: { msg: "Target Not In Map" } });

    const isTarget = verifyPosition(data.position, position, mapSize);

    if (isTarget) res.json({ verified: true });
    else res.json({ verified: false });
  } catch (err) {
    res.status(500).json({ error: { msg: "Server Error" } });
  }
};

export { verifyTargetPost };
