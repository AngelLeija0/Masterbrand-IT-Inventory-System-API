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

    const validateInfo = validateTonerChange(tonerChangeInfo);
    if (validateInfo.error) {
      return { success: false, message: validateInfo.error.message };
    }
    const existsData = await searchAssetsInDb(validateInfo.data.toner.id, validateInfo.data.printer.id)
    if (!existsData.success) {
      return res.status(400).json({ message: existsData.message });
    }

    const tonerChangeAdded = await createTonerChange(validateInfo.data);
    if (!tonerChangeAdded.success) {
      return res.status(400).json({ message: tonerChangeAdded.message });
    }
    
    const tonerUpdated = await updateTonerStock(validateInfo.data.toner.id)
    if (!tonerUpdated.success) {
      return res.status(400).json({ message: tonerUpdated.message });
    }

    const actionAdded = await createActionToPrinter(
      validateInfo.data.printer.id,
      validateInfo.data.toner
    );
    if (!actionAdded.success) {
      return res.status(400).json({ message: "Error at adding action." });
    }

    res.status(201).json({ success: true, toner: tonerUpdated.data, printer: actionAdded.data })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message });
  }
});

async function searchAssetsInDb (tonerId,  printerId) {
  try {
    const toner = await Toner.findById(tonerId);
    if (!toner) {
      return { success: false, message: "Toner not found" }
    }
    const printer = await Assets.findById(printerId);
    if (!printer) {
      return { success: false, message: "Printer not found" }
    }
    return { success: true }
  } catch (error) {
    return { success: false, message: error.message };
  }
}

async function createTonerChange(tonerChangeInfo) {
  try {
    const toner = await Toner.findById(tonerChangeInfo.toner.id);
    if (!toner) {
      return { success: false, message: "Invalid or incorrect toner id" };
    }

    const newTonerChange = new TonerChanges(tonerChangeInfo);
    const tonerChangeAdded = await newTonerChange.save();

    return { success: true, data: tonerChangeAdded };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

async function updateTonerStock(tonerId) {
  const toner = await Toner.findById(tonerId);
  if (!toner) {
    return { success: false, message: "Invalid or incorrect toner id" };
  }
  const currentStock = Number(toner.stock);
  const newStock = currentStock - 1
  toner.stock = newStock.toString()

  const newOutgoingStock = 1
  toner.outgoingStock.quantity = newOutgoingStock.toString()
  toner.outgoingStock.date = new Date().toString()

  const tonerUpdated = await toner.save();
  return { success: true, data: tonerUpdated }
}

async function createActionToPrinter(printerId, toner) {
  try {
    const printer = await Assets.findById(printerId);
    console.log("p1")
    if (!printer) {
      return { success: false, message: validateInfo.error.message };
    }

    console.log({ toner, printer })
    const newAction = {
      id: Date.now(),
      name: `Cambio de toner`,
      description: `Cambio de toner ${toner.name} a impresora ${printer.name}`,
      status: "Completado",
      date: new Date(),
    };
    console.log(newAction)

    printer.actions.push(newAction);
    printer.updated_at = new Date();
    const printerUpdated = await printer.save();
    return { success: true, data: printerUpdated };
  } catch (error) {
    return { success: false, message: error.message };
  }
}



export default router;
