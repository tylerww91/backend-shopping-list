const { Router } = require('express');
const Item = require('../models/Item');
const authorize = require('../middleware/authorize');

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
  })

  .put('/:id', authorize, async (req, res, next) => {
    try {
      const data = await Item.updateById(req.params.id, req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })

  .delete('/:id', authorize, async (req, res, next) => {
    try {
      const data = await Item.delete(req.params.id);
      res.json(data);
    } catch (e) {
      next(e);
    }
  });

// TO DO - implement items CRUD
