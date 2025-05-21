const express = require('express');
const router = express.Router();


/**
 * @swagger
 * /:
 *   get:
 *     summary: Render the index page
 *     description: Returns a rendered HTML page with a message.
 *     responses:
 *       200:
 *         description: HTML page rendered successfully
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *               example: "<html><body>I love you Michelle</body></html>"
 */
router.get('/', (req, res) => {
    res.render('index', {title: "title", message: "I love you Michelle"})
})

module.exports = router;