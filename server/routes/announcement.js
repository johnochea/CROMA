const { Router } = require('express');

const router = Router();
const db = require('../database').databaseConnection;

router.post('/post', async (req, res) => {
    const q = 'INSERT INTO announcements (`announcement_title`, `announcement_body`) VALUES (?)'
    const values = [
      req.body.announcement_title,
      req.body.announcement_body,]
    
  
    db.query(q,[values], (err, data) => {
      if(err) console.error('ERROR', err);
    })
    res.json(req.body.announcement_body)
  })

router.get('/details', async (req,res) => {
  const q = 'SELECT * FROM announcements'

  const details = await new Promise((resolve) => {
    db.query(q, (err, data) => {
      if(err) console.error('ERROR', err);
      resolve(data)
    })
  })

  const values = []

  for(i=0;i<details.length;i++){
    let temp = String(details[i].announcement_datetime)
  const date = temp.substring(4,15)
  const time = temp.substring(16,24)

  values.push({
    announcement_title: details[i].announcement_title,
    announcement_date: date,
    announcement_time: time,
    announcement_body: details[i].announcement_body
  })
  }
  
  res.json(values)
})
module.exports = router;