const { Router } = require('express');
const Item = require('../models/Item');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const items = await Item.getAll(req.user.id);
      res.json(items);
    } catch (e) {
      next(e);
    }
  })

  .post('/', async (req, res, next) => {
    try {
      const data = await Item.insert({
        description: req.body.description,
        qty: req.body.qty,
        user_id: req.user.id,
      });
      res.json(data);
    } catch (e) {
      next(e);
    }
  });

// TO DO - implement items CRUD
