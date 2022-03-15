const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const cool = require('cool-ascii-faces');

const SteamAPI = require('steamapi');
const { resolve } = require('path');
const steam  = new SteamAPI('9C2F8B579B777036AD7B17C6A5BEC8FA')


let teststring = "";

steam.getUserOwnedGames("76561198133758253",true,true).then(arr=>{
  let output = new String;
  arr.forEach(x=>{
    output += `[${x.name}, ${x.appID}, ${x.playTime}, ${x.playTime2}]\n`
  })

  //console.log(typeof(output));
  //console.log(output);
  teststring = output;
});

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/test',(req,res)=>res.send(`${teststring}`))
  .get('/cool', (req, res) => res.send(cool()))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

console.log('post-listen message');