  const mongoose = require('mongoose');
  const bagpack = require('./schema/user')
  const express = require('express');
  const cors = require('cors');
  var bodyParser = require('body-parser')
  require('dotenv').config()

  const app = express();
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  app.use(cors())
  app.use(express.json());
  app.use(express.static('./'))

  mongoose.connect("mongodb+srv://Tejasdb:eNGrSQ83u6rAjxaE@userdb.0jb7umc.mongodb.net/bagpack", { useNewUrlParser: true, useUnifiedTopology: true})
  const db = mongoose.connection

  db.on('error', (error) => console.error("Error Occure ----> "+ error))
  db.once('open', ()=> console.log('connected to database'))

    //get all info of specific doc by ID Middalware
  async function getById(req, res, next) {
    let item
    try {
      item = await bagpack.findById(req.params.id)
      if (item == null) {
        return res.status(404).json({message: "Can't find user"})
      }

    } catch (e) {
      return res.status(500).json({message: e.message})
    }
    res.item = item
    next()
  }

  app.post('/read_all', async(req, res) => {
    try{
        // console.log(req.body)
        const items = await bagpack.find(req.body.data);
        res.status(202).json({items});
    } catch (e) {
        res.status(404).json({"msg": "error Occured!"});
    }
  })

  app.get('/:id', getById, async(req, res) => {
      try{
          res.status(202).json({item: res.item});
      } catch (e) {
          res.status(404).json({"msg": "error Occured!"});
      }
  })

  app.post('/create', async(req, res) => {
      try{
        const data = await bagpack.create(req.body);
        res.status(202).json({data});
      } catch (e) {
        res.status(404).json({"msg": "error Occured!"});
      } 
  })
  
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log("Server is Started! in port: "+ PORT);
  });
  
