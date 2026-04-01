// src/controllers/distribuidor.controller.js
import distribuidorService from "../services/distribuidor.service.js";

export const listDistribuidores = async (req, res) => {
    try {
        const distribuidores = await distribuidorService.listarDistribuidores();
        res.json(distribuidores);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

export const createDistribuidor = async (req, res) => {
    try {
        const distribuidor = await distribuidorService.crearDistribuidor(req.body);
        res.status(201).json(distribuidor);
    } catch (err) {
        res.status(400).json({ msg: err.message });
    }
};

export const getDistribuidor = async (req, res) => {
    try {
        const distribuidor = await distribuidorService.getById(req.params.id);
        res.json(distribuidor);
    } catch (err) {
        res.status(404).json({ msg: err.message });
    }
};

export const updateDistribuidor = async (req, res) => {
    try {
        const updated = await distribuidorService.update(req.params.id, req.body);
        res.json(updated);
    } catch (err) {
        res.status(400).json({ msg: err.message });
    }
};

export const deleteDistribuidor = async (req, res) => {
    try {
        const deleted = await distribuidorService.delete(req.params.id);
        res.json(deleted);
    } catch (err) {
        res.status(400).json({ msg: err.message });
    }
};