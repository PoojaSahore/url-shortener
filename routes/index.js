const express = require('express');
const router = express.Router();
const Url = require('../models/url');
const config = require('../config');
const base58 = require('../base58.js');
const path = require('path');


  router.post('/shorten', function(req, res){
    var longUrl = req.body.url;
    var shortUrl = '';
  
    Url.findOne({long_url: longUrl}, function (err, doc){
      if (doc){
        shortUrl = config.webhost + base58.encode(doc._id); 
        res.send(shortUrl);
      } else {  
        var newUrl = new Url({
          long_url: longUrl
        });
  
        newUrl.save(function(err) {
          if (err){
            console.log(err);
          }
          
          shortUrl = config.webhost + base58.encode(newUrl._id);
          res.send(shortUrl)
          
        });
      }
  
    });
  
  });
  
  router.get('/:encoded_id', function(req, res){
  
    var base58Id = req.params.encoded_id; 
    
    var id = base58.decode(base58Id);
    
    Url.findOne({_id: id}, function (err, doc){
      if (doc) {
        res.redirect(doc.long_url);
      } else {
        res.redirect(config.webhost);
      }
    });
  
  });

  module.exports = router;