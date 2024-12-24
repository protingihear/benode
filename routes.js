const express = require('express');
const pool = require('./db');
const router = express.Router();
console.log("sini")
router.post('/create', async (req, res) => {
    console.log('hit');
    const { kategorikategori, kata, deskpris, link_yt } = req.body;

    if (!Array.isArray(kategorikategori) || typeof kata !== 'string' || typeof deskpris !== 'string' || typeof link_yt !== 'string') {
        return res.status(400).send({ error: 'Invalid input' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO entries (kategorikategori, kata, deskpris, link_yt) VALUES ($1, $2, $3, $4) RETURNING *',
            [kategorikategori, kata, deskpris, link_yt]
        );
        res.status(201).send(result.rows[0]);
    } catch {
        res.status(500).send({ error: 'Create failed' });
    }
});

router.post('/create-category', async (req, res) => {
    const { name, description } = req.body;

    if (typeof name !== 'string' || typeof description !== 'string') {
        return res.status(400).send({ error: 'Invalid input' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO categories (name, description) VALUES ($1, $2) RETURNING *',
            [name, description]
        );
        res.status(201).send(result.rows[0]);
    } catch {
        res.status(500).send({ error: 'Create failed' });
    }
});

router.get('/read', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM entries');
        res.send(result.rows);
    } catch {
        res.status(500).send({ error: 'Read failed' });
    }
});

router.put('/update/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { kategorikategori, kata, deskpris, link_yt } = req.body;

    if (!Array.isArray(kategorikategori) || typeof kata !== 'string' || typeof deskpris !== 'string' || typeof link_yt !== 'string') {
        return res.status(400).send({ error: 'Invalid input' });
    }

    try {
        const result = await pool.query(
            'UPDATE entries SET kategorikategori = $1, kata = $2, deskpris = $3, link_yt = $4 WHERE id = $5 RETURNING *',
            [kategorikategori, kata, deskpris, link_yt, id]
        );

        if (result.rowCount === 0) {
            return res.status(404).send({ error: 'Not found' });
        }

        res.send(result.rows[0]);
    } catch {
        res.status(500).send({ error: 'Update failed' });
    }
});

router.delete('/delete/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);

    try {
        const result = await pool.query('DELETE FROM entries WHERE id = $1 RETURNING *', [id]);

        if (result.rowCount === 0) {
            return res.status(404).send({ error: 'Not found' });
        }

        res.send(result.rows[0]);
    } catch {
        res.status(500).send({ error: 'Delete failed' });
    }
});

module.exports = router;
