const express = require('express');
const router = express.Router();

router.route('/')
    .post((req, res) => {

    })

    .get((req, res) => {
        const result = {
            success: true,
            data: [{ name: 'EXTJS-123', id: 1 }, { name: 'EXTJS-123', id: 2 },{name: 'EXTJS-123', id: 3}]
        }
            
        res.json(result);
    })

module.exports = router