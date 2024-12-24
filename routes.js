const express = require('express');
const pool = require('./db');
const router = express.Router();

router.post('/create', async (req, res) => {
    const { kategorikategori, kata, deskpris, link_yt } = req.body;

    if (!Array.isArray(kategorikategori) || typeof kata !== 'string' || typeof deskpris !== 'string' || typeof link_yt !== 'string') {
        return res.status(400).send({ error: 'Invalid input' });
    }

    try {
        console.log('Inserting into database:', { kategorikategori, kata, deskpris, link_yt });
        const [result] = await pool.query(
            'INSERT INTO entries (kategorikategori, kata, deskpris, link_yt) VALUES (?, ?, ?, ?)',
            [JSON.stringify(kategorikategori), kata, deskpris, link_yt]
        );
        res.status(201).send({ id: result.insertId, ...req.body });
    } catch (error) {
        console.error('Error during insert:', error);
        res.status(500).send({ error: 'Create failed' });
    }
});

router.post('/create-category', async (req, res) => {
    const { name, description } = req.body;

    if (typeof name !== 'string' || typeof description !== 'string') {
        return res.status(400).send({ error: 'Invalid input' });
    }

    try {
        console.log('Inserting category into database:', { name, description });
        const [result] = await pool.query(
            'INSERT INTO categories (name, description) VALUES (?, ?)',
            [name, description]
        );
        res.status(201).send({ id: result.insertId, name, description });
    } catch (error) {
        console.error('Error during category insert:', error);
        res.status(500).send({ error: 'Create failed' });
    }
});

router.get('/read', async (req, res) => {
    try {
        console.log('Fetching entries from database');
        const [rows] = await pool.query('SELECT * FROM entries');
        res.send(rows);
    } catch (error) {
        console.error('Error during fetch:', error);
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
        console.log('Updating database for id:', id, { kategorikategori, kata, deskpris, link_yt });
        const [result] = await pool.query(
            'UPDATE entries SET kategorikategori = ?, kata = ?, deskpris = ?, link_yt = ? WHERE id = ?',
            [JSON.stringify(kategorikategori), kata, deskpris, link_yt, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).send({ error: 'Not found' });
        }

        res.send({ id, kategorikategori, kata, deskpris, link_yt });
    } catch (error) {
        console.error('Error during update:', error);
        res.status(500).send({ error: 'Update failed' });
    }
});

router.delete('/delete/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);

    try {
        console.log('Deleting from database id:', id);
        const [result] = await pool.query('DELETE FROM entries WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).send({ error: 'Not found' });
        }

        res.send({ id });
    } catch (error) {
        console.error('Error during delete:', error);
        res.status(500).send({ error: 'Delete failed' });
    }
});

module.exports = router;
