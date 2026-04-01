import authService from "../services/auth.service.js";

export const register = async (req, res) => {
    try {
        const user = await authService.register(req.body);
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ msg: err.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await authService.login(email, password);
        res.json(result);
    } catch (err) {
        res.status(401).json({ msg: err.message });
    }
};

export const loginDistribuidor = async (req, res) => {
    try {
        const { username, password } = req.body;
        const result = await authService.loginDistribuidor(username, password);
        res.json(result);
    } catch (err) {
        res.status(401).json({ msg: err.message });
    }
};