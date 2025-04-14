import models from "../models/index.js";

const allMapsGet = async (req, res) => {
  try {
    const maps = await models.Map.findMany();
    res.json({ maps });
  } catch (err) {
    res.status(500).json({ error: { msg: "Server Error" } });
  }
};

const mapGet = async (req, res) => {
  const { mapId } = req.params;

  try {
    const map = await models.Map.find(mapId);

    if (!map) res.status(404).json({ error: { msg: "Map Not Found" } });

    res.json({ map });
  } catch (err) {
    res.status(500).json({ error: { msg: "Server Error" } });
  }
};

export { allMapsGet, mapGet };
