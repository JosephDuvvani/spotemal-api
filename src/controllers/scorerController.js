import models from "../models/index.js";

const scorersPost = async (req, res) => {
  const { mapId } = req.params;
  const { scorer } = req.body;

  if (scorer?.username.trim() === "") {
    return res.status(400).json({
      error: "Username is required",
    });
  }

  try {
    const existingScorers = await models.Scorer.findMany(mapId);

    if (!existingScorers) {
      return res.status(400).json({
        error: "Scorers Not Found",
      });
    }

    if (existingScorers.length < 10) {
      const newScorer = await models.Scorer.create(mapId, scorer);
      return res.status(201).json({ scorer: newScorer });
    }

    const lastScorer = existingScorers[existingScorers.length - 1];
    const isScore = scorer.time < lastScorer.time;

    if (!isScore) {
      return res.sendStatus(204);
    }
    await models.Scorer.destroy(lastScorer.id);
    const newScorer = await models.Scorer.create(mapId, scorer);
    res.status(201).json({ scorer: newScorer });
  } catch (error) {
    res.status(500).json({ error: "Error creating scorer" });
  }
};

const scorersGet = async (req, res) => {
  const { mapId } = req.params;

  try {
    const scorers = await models.Scorer.findMany(mapId);

    if (!scorers) {
      return res.status(400).json({
        error: "Scorers Not Found",
      });
    }

    res.status(200).json({ scorers });
  } catch (error) {
    res.status(500).json({ error: "Error fetching scorers" });
  }
};

export { scorersPost, scorersGet };
