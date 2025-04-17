import models from "../models/index.js";

const allMapsGet = async (req, res) => {
  try {
    const maps = await models.Map.findMany();
    res.json({ maps });
  } catch (err) {
    res.status(500).json({ error: { msg: "Server Error" } });
  }
};

export { allMapsGet };
