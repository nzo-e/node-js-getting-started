const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const { resolve } = require('path');

const cool = require('cool-ascii-faces');

const SteamAPI = require('steamapi');
const steam  = new SteamAPI('9C2F8B579B777036AD7B17C6A5BEC8FA')

const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/test', async (req,res)=>{
    try {
      steam.getUserOwnedGames("76561198133758253",true,true).then(arr=>{
        let output = new String;
        arr.forEach(x=>{
          output += `[${x.name}, ${x.appID}, ${x.playTime}, ${x.playTime2}]\n`
        })
        res.send(output)
      });
    }
    catch (err)
    {
      console.error(err);
      res.send("Error " + err);
    }
  })
  .get('/cool', (req, res) => res.send(cool()))
  .get('/times', (req, res) => res.send(showTimes()))
  .get('/db', async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM test_table');
      const results = { 'results': (result) ? result.rows : null};
      res.render('pages/db', results );
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })

  .get('/db2', async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM wallet_balances');
      const results = { 'results': (result) ? result.rows : null};
      res.render('pages/wallet', results );
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

console.log('post-listen message');

showTimes = () => {
  let result = '';
  const times = process.env.TIMES || 5;   
  for (i = 0; i < times; i++) {
    result += i + ' ';
  }
  return result;
}
