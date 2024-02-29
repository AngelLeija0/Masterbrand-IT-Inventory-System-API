import { Router } from "express";
const router = Router();

import TonerChanges from "../../../models/tonerChanges.mjs";
import { validateTonerChange } from "../../../schemas/tonerChanges.mjs";

import Assets from "../../../models/asset.mjs";

router.post("/changes/create", async (req, res) => {
  try {
    const tonerChangeInfo = req.body;
    if (!tonerChangeInfo) {
      return res.status(400).json({ message: "Data no found it" });
    }

    const tonerAdded = await createTonerChange(tonerChangeInfo);
    const actionAdded = await createActionToPrinter(
      tonerChangeInfo.printer,
      tonerChangeInfo.toner
    );

    if (tonerAdded.success && actionAdded.success) {
      return res.status(201).json({ tonerAdded, actionAdded });
    }

    res
      .status(400)
      .json({ message1: tonerAdded.message, message2: actionAdded.message });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function createTonerChange(tonerChangeInfo) {
  try {
    const validateInfo = validateTonerChange(tonerChangeInfo);
    if (validateInfo.error) {
      return { success: false, message: validateInfo.error.message };
    }
    const newToner = new TonerChanges(validateInfo.data);
    const tonerAdded = await newToner.save();
    return { success: true, data: tonerAdded };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

async function createActionToPrinter(printer, toner) {
  try {
    const printerData = await Assets.findById(printer.id);
    if (!printer) {
      return { success: false, message: validateInfo.error.message };
    }

    const newAction = {
      id: Date.now(),
      name: `Cambio de toner`,
      description: `Cambio de toner ${toner.name} a impresora ${printer.name}`,
      status: "Completado",
      date: new Date(),
    };

    printerData.actions.push(newAction);
    printerData.updated_at = new Date();

    const printerDataUpdated = await printerData.save();
    return { success: true, data: printerDataUpdated };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

export default router;
