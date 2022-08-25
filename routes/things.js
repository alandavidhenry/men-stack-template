const express = require('express');
const router = express.Router();
const Thing = require('../models/things');

/* GET Render things index page */
router.get('/index', async (req, res, next) => {
	const things = await Thing.find({});
	res.render('things/index', { things });
  });
  
  /* GET Render add a new thing page */
  router.get('/new', (req, res, next) => {
	res.render('things/new');
  });
  
  /* POST Add a new thing to the database and redirect to home */
  router.post('/', async (req, res, next) => {
	const thing = new Thing(req.body.thing);
	await thing.save();
	res.redirect('/');
  });
  
  /* GET Render thing using id page */
  router.get('/:id', async (req, res, next) => { 
  /* (CANNOT USE PARAMS IN GET) */
	const thing = await Thing.findById(req.params.id);
	res.render('things/show', { thing });
  });
  
  /* GET Render thing edit page (if no things exist, redirect to home */
  router.get('/:id/edit', async (req, res, next) => {
	const thing = await Thing.findById(req.params.id);
	if(!thing) {
	  res.redirect('/');
	}
	res.render('things/edit', { thing });
  });
  
  /* PUT submit thing edit to database and redirect to the index page */
  router.put('/:id/edit', async (req, res, next) => {
	const { id } = req.params;
	const thing = await Thing.findByIdAndUpdate(id, { ...req.body.thing });
	res.redirect('/things/index')
  });
  
  /* DELETE Delete thing and redirect to the index page */
  router.delete('/:id', async (req, res, next) => {
	const { id } = req.params;
	await Thing.findByIdAndDelete(id);
	res.redirect('/things/index');
  });

module.exports = router;
