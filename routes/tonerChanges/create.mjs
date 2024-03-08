import { Router } from "express";
const router = Router();

import Toner from "../../models/toner.mjs"
import TonerChanges from "../../models/tonerChanges.mjs";
import { validateTonerChange } from "../../schemas/tonerChanges.mjs";

import Assets from "../../models/asset.mjs";

router.post("/create", async (req, res) => {
  try {
    const tonerChangeInfo = req.body;
    if (!tonerChangeInfo) {
      return res.status(400).json({ message: "Data no found it" });
    }

    const tonerChangeAdded = await createTonerChange(tonerChangeInfo);
    if (!tonerChangeAdded.success) {
      return res.status(400).json({ message: "Error at adding toner change.jh" });
    }

    const tonerUpdated = await updateTonerStock(tonerChangeInfo.toner.id)
    if (!tonerUpdated.success) {
      return res.status(400).json({ message: "Error at updating toner stock." });
    }

    const actionAdded = await createActionToPrinter(
      tonerChangeInfo.printer,
      tonerChangeInfo.toner
    );

    if (!actionAdded.success) {
      return res.status(400).json({ message: "Error at adding action." });
    }
    res.status(201).json({ success: true, toner: tonerAdded.data, printer: actionAdded.data })
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function createTonerChange(tonerChangeInfo) {
  try {
    const toner = await Toner.findById(tonerChangeInfo.toner.id);
    if (!toner) {
      return { success: false, message: "Invalid or incorrect toner id" }; 
    }

    const validateInfo = validateTonerChange(tonerChangeInfo);
    if (validateInfo.error) {
      return { success: false, message: validateInfo.error.message };
    }
    const newTonerChange = new TonerChanges(validateInfo.data);
    const tonerChangeAdded = await newTonerChange.save();

    return { success: true, data: tonerChangeAdded };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

async function updateTonerStock(tonerId) {

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
