import { v4 as uuidv4 } from 'uuid';
import assets from '../data.js';

// GET /api/assets — Ambil semua aset (support filter by status)
export const getAllAssets = (req, res) => {
  const { status } = req.query;
  let result = assets;

  if (status) {
    result = assets.filter(
      (a) => a.status.toLowerCase() === status.toLowerCase()
    );
  }

  return res.status(200).json({
    success: true,
    message: "Berhasil mengambil data aset",
    data: { total: result.length, assets: result },
  });
};

// GET /api/assets/:id — Ambil aset berdasarkan ID
export const getAssetById = (req, res) => {
  const asset = assets.find((a) => a.id === req.params.id);
  if (!asset) {
    return res.status(404).json({
      success: false,
      message: `Aset dengan id '${req.params.id}' tidak ditemukan`,
    });
  }
  return res.status(200).json({ success: true, data: asset });
};

// POST /api/assets — Tambah aset baru
export const createAsset = (req, res) => {
  const { name, type, rack_position, status, ip_address } = req.body;
  const errors = [];

  if (!name || typeof name !== "string") errors.push("name wajib diisi");
  if (!type || typeof type !== "string") errors.push("type wajib diisi");
  if (!status) errors.push("status wajib diisi (active/maintenance/down)");

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Validasi gagal",
      errors,
    });
  }

  const newAsset = {
    id: uuidv4(),
    name, 
    type, 
    rack_position, 
    status, 
    ip_address,
    created_at: new Date().toISOString(),
  };

  assets.push(newAsset);

  return res.status(201).json({
    success: true,
    message: "Aset berhasil ditambahkan",
    data: newAsset,
  });
};

// PUT /api/assets/:id — Update aset
export const updateAsset = (req, res) => {
  const index = assets.findIndex((a) => a.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: `Aset dengan id '${req.params.id}' tidak ditemukan`,
    });
  }

  const { name, type, rack_position, status, ip_address } = req.body;
  assets[index] = {
    ...assets[index],
    ...(name && { name }),
    ...(type && { type }),
    ...(rack_position && { rack_position }),
    ...(status && { status }),
    ...(ip_address && { ip_address }),
    updated_at: new Date().toISOString(),
  };

  return res.status(200).json({
    success: true,
    message: "Aset berhasil diupdate",
    data: assets[index],
  });
};

// DELETE /api/assets/:id — Hapus aset
export const deleteAsset = (req, res) => {
  const index = assets.findIndex((a) => a.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: `Aset dengan id '${req.params.id}' tidak ditemukan`,
    });
  }

  const deleted = assets.splice(index, 1)[0];
  return res.status(200).json({
    success: true,
    message: "Aset berhasil dihapus",
    data: deleted,
  });
};