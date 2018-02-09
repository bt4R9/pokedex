const express = require('express');

module.exports = (csrfProtection) => {
    const router = express.Router();

    router
        .route('/pokemons/:offset/:limit')
        .get(async(req, res) => {
            res.json({
                success: true
            });
        });

    return router;
};
