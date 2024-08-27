const Models = require("../models/user");

async function handelPostAllUser(req, res) {
    const data = new Models(req.body);
    try {
        await data.save();
        res.status(201).send(data);
    } catch (e) {
        res.status(400).send(e);
    }
}

async function handelGetAllUser(req, res) {
    try {
        const data = await Models.find({});
        res.status(200).send(data);
    } catch (e) {
        res.status(400).send(e);
    }
}

async function handelByIdUser(req, res) {
    const _id = req.params.id;
    try {
        const data = await Models.findById(_id);
        if (!data) {
            return res.status(404).send({ error: 'User not found' });
        }
        res.status(200).send(data);
    } catch (e) {
        res.status(400).send(e);
    }
}

async function handelUpdateUser(req, res) {
    const updates = Object.keys(req.body);
    const allowedUpdate = ["name", "age", "email", "phone", "password"];
    const isValidUpdate = updates.every((update) => allowedUpdate.includes(update));
    
    if (!isValidUpdate) {
        return res.status(400).send({ error: "Invalid update" });
    }
    
    try {
        const data = await Models.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!data) {
            return res.status(404).send({ error: 'User not found' });
        }
        res.status(200).send(data);
    } catch (e) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function handelDeleteUser(req, res) {
    const _id = req.params.id;
    try {
        const data = await Models.findByIdAndDelete(_id);
        if (!data) {
            return res.status(404).send({ error: 'User not found' });
        }
        res.status(200).send(data);
    } catch (e) {
        res.status(400).send(e);
    }
}

// ---------------------login---------------
async function handelTologin(req, res) {
    const { email, password } = req.body;
    try {
        const user = await Models.findByCredentials(email, password);
        res.status(200).send(user);
    } catch (e) {
        res.status(400).send({ error: 'Invalid login credentials' });
    }
}

module.exports = {
    handelPostAllUser,
    handelGetAllUser,
    handelByIdUser,
    handelUpdateUser,
    handelDeleteUser,
    handelTologin
};
