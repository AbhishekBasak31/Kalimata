// Controller/HomeGrowthController.js
import mongoose from "mongoose";
import HomeGrowth from "../../Model/Home/Growth.js"; // adjust path if needed

// helper to normalize values
const norm = (v) => {
  if (v === undefined || v === null) return undefined;
  const s = String(v).trim();
  return s.length ? s : undefined;
};

const requireFieldsForCreate = (body) => {
  const missing = [];
  if (!norm(body.labels)) missing.push("labels");
  if (!norm(body.Value)) missing.push("Value");
  if (!norm(body.Mstone)) missing.push("Mstone");
  if (!norm(body.Year)) missing.push("Year");
  if (!norm(body.Title)) missing.push("Title");
  if (!norm(body.Desc)) missing.push("Desc");
  return missing;
};

export const createHomeGrowth = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const payload = {
      labels: norm(req.body.labels),
      Value: norm(req.body.Value),
      Mstone: norm(req.body.Mstone),
      Year: norm(req.body.Year),
      Title: norm(req.body.Title),
      Desc: norm(req.body.Desc),
    };

    const missing = requireFieldsForCreate(req.body);
    if (missing.length) {
      if (session.inTransaction()) await session.abortTransaction();
      return res.status(400).json({ success: false, message: `Missing fields: ${missing.join(", ")}` });
    }

    const doc = new HomeGrowth(payload);
    await doc.save({ session });

    await session.commitTransaction();
    const result = await HomeGrowth.findById(doc._id);
    return res.status(201).json({ success: true, message: "HomeGrowth created", data: result });
  } catch (err) {
    try { if (session.inTransaction()) await session.abortTransaction(); } catch (e) { console.error("abortTransaction error:", e); }
    console.error("createHomeGrowth error:", err);
    if (err.name === "ValidationError") {
      const errors = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ success: false, message: "Validation failed", errors });
    }
    return res.status(500).json({ success: false, message: "Internal server error", error: err.message });
  } finally {
    session.endSession();
  }
};

export const listHomeGrowth = async (req, res) => {
  try {
    const items = await HomeGrowth.find({}).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: items });
  } catch (err) {
    console.error("listHomeGrowth error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const getHomeGrowth = async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      if (!mongoose.Types.ObjectId.isValid(String(id))) return res.status(400).json({ success: false, message: "Invalid ID" });
      const doc = await HomeGrowth.findById(id);
      if (!doc) return res.status(404).json({ success: false, message: "HomeGrowth not found" });
      return res.status(200).json({ success: true, data: doc });
    }

    if (req.path && req.path.endsWith("/latest")) {
      const latest = await HomeGrowth.findOne({}).sort({ createdAt: -1 });
      if (!latest) return res.status(404).json({ success: false, message: "No HomeGrowth found" });
      return res.status(200).json({ success: true, data: latest });
    }

    const items = await HomeGrowth.find({}).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: items });
  } catch (err) {
    console.error("getHomeGrowth error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const updateHomeGrowth = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const { id } = req.params;
    if (!id) {
      if (session.inTransaction()) await session.abortTransaction();
      return res.status(400).json({ success: false, message: "HomeGrowth ID required" });
    }
    if (!mongoose.Types.ObjectId.isValid(String(id))) {
      if (session.inTransaction()) await session.abortTransaction();
      return res.status(400).json({ success: false, message: "Invalid HomeGrowth ID" });
    }

    const existing = await HomeGrowth.findById(id).session(session);
    if (!existing) {
      if (session.inTransaction()) await session.abortTransaction();
      return res.status(404).json({ success: false, message: "HomeGrowth not found" });
    }

    const setPayload = {};
    const fields = ["labels","Value","Mstone","Year","Title","Desc"];
    for (const k of fields) {
      if (typeof req.body[k] !== "undefined") {
        const v = norm(req.body[k]);
        if (!v) {
          if (session.inTransaction()) await session.abortTransaction();
          return res.status(400).json({ success: false, message: `${k} cannot be empty` });
        }
        setPayload[k] = v;
      }
    }

    if (Object.keys(setPayload).length === 0) {
      if (session.inTransaction()) await session.abortTransaction();
      return res.status(400).json({ success: false, message: "No fields provided to update" });
    }

    const updated = await HomeGrowth.findByIdAndUpdate(id, { $set: setPayload }, { new: true, runValidators: true, session });

    await session.commitTransaction();
    return res.status(200).json({ success: true, message: "HomeGrowth updated", data: updated });
  } catch (err) {
    try { if (session.inTransaction()) await session.abortTransaction(); } catch (e) { console.error("abortTransaction error:", e); }
    console.error("updateHomeGrowth error:", err);
    if (err.name === "ValidationError") {
      const errors = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ success: false, message: "Validation failed", errors });
    }
    return res.status(500).json({ success: false, message: "Internal server error", error: err.message });
  } finally {
    session.endSession();
  }
};

export const deleteHomeGrowth = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const { id } = req.params;
    if (!id) {
      if (session.inTransaction()) await session.abortTransaction();
      return res.status(400).json({ success: false, message: "HomeGrowth ID required" });
    }
    if (!mongoose.Types.ObjectId.isValid(String(id))) {
      if (session.inTransaction()) await session.abortTransaction();
      return res.status(400).json({ success: false, message: "Invalid HomeGrowth ID" });
    }

    const existing = await HomeGrowth.findById(id).session(session);
    if (!existing) {
      if (session.inTransaction()) await session.abortTransaction();
      return res.status(404).json({ success: false, message: "HomeGrowth not found" });
    }

    await HomeGrowth.findByIdAndDelete(id).session(session);

    await session.commitTransaction();
    return res.status(200).json({ success: true, message: "HomeGrowth deleted" });
  } catch (err) {
    try { if (session.inTransaction()) await session.abortTransaction(); } catch (e) { console.error("abortTransaction error:", e); }
    console.error("deleteHomeGrowth error:", err);
    return res.status(500).json({ success: false, message: "Internal server error", error: err.message });
  } finally {
    session.endSession();
  }
};
