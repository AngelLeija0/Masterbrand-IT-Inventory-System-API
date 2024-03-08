import { Router } from "express";
const router = Router();

import Toner from "../../models/toner.mjs";
import { validatePartialToner } from "../../schemas/toner.mjs";

router.patch("/update/:id", async (req, res) => {
  try {
    const tonerInfo = req.body;
    if (!tonerInfo) {
      return res.status(400).json({ message: "Data no found it" });
    }

    const validateInfo = validatePartialToner(tonerInfo);
    if (validateInfo.error) {
      return res.status(400).json({ message: validateInfo.error.message });
    }

    const toner = await Toner.findById(req.params.id);
    if (!toner) {
      return res.status(404).json({ message: "Category not found" });
    }

    toner.set(validateInfo.data);
    toner.updated_at = new Date();

    const tonerUpdated = await toner.save();
    res.status(201).json(tonerUpdated);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message });
  }
});

export default router;
