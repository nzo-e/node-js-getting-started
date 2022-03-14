const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const cool = require('cool-ascii-faces');

const SteamAPI = require('steamapi');
const steam  = new SteamAPI('9C2F8B579B777036AD7B17C6A5BEC8FA')

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/cool', (req, res) => res.send(cool()))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
