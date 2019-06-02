const express = require('express');
const mongoose = require('mongoose');
const Doctor = require('../models/user');
const Post = require('../models/post');
const router = express.Router();
const fetch = require('node-fetch');


router.get('/', function (req, res, next) {
  res.render('homePage', { doctor: req.session.name });
});

router.route('/login')
  .get((req, res) => {
    res.render('login')
  })
  .post(async (req, res) => {
    const doctorsNames = (await Doctor.find()).map((item) => item.name)
    const doctorsPasses = (await Doctor.find()).map((item) => item.password)
    if (doctorsNames.includes(req.body.name) && doctorsPasses.includes(req.body.password)) {
      req.session.name = req.body.name;
      return res.send({ url: '/' })
    }
    return res.send({ error: 'неправильно введены данные' });
  })

router.route('/placemark')
  .post(async (req, res) => {
    const doctors = await Doctor.find();
    // console.log(doctors);
    let placemarks = [];
    for (let i = 0; i < doctors.length; i++) {
      let address = doctors[i].address.replace(', ', '+');
      let res1 = await fetch(encodeURI(`https://geocode-maps.yandex.ru/1.x/?apikey=5fbca2da-4afa-416a-97f8-463929f62c71&format=json&geocode=${address}`));
      let result = await res1.json()
      let coordinates = result.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ');
      let onePlacemark = {
        latitude: coordinates[1],
        longitude: coordinates[0],
        hintContent: `<div>${doctors[i].address}</div>`,
        balloonContent: [
          `
          <div>
            <ul>
              <li>${doctors[i].name}</li>
              <li>${doctors[i].address}</li>
              <li>${doctors[i].type}</li>
              <li>${doctors[i].timeFrom}-${doctors[i].timeTo}</li>
            </ul>
          </div>
          `
        ]
      }
      placemarks.push(onePlacemark);
    }
    // console.log(placemarks);
    await res.send(placemarks)

    // // console.log(result.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos);
    // console.log(coordinates);
    // await res.json({ latitude: coordinates[1], longitude: coordinates[0], name: req.session.name, url: '/' })
  })

router.route('/distance')
  .post(async (req,res) => {
    const doctors = await Doctor.find({type:req.body.doctorType});
    // console.log(doctors);
    // console.log(req.body.doctorType);
    res.send(doctors)
  })



router.route('/reg')
  .get((req, res) => {
    res.render('reg')
  })
  .post(async (req, res) => {
    let doctor = new Doctor({
      name: req.body.username,
      email: req.body.email,
      password: req.body.password,
      address: req.body.address,
      timeFrom: req.body.timeFrom,
      timeTo: req.body.timeTo,
      type: req.body.type,
      orders: []
    })
    await doctor.save();
    req.session.name = req.body.username;
    let address = req.body.address.replace(', ', '+');
    let res1 = await fetch(encodeURI(`https://geocode-maps.yandex.ru/1.x/?apikey=5fbca2da-4afa-416a-97f8-463929f62c71&format=json&geocode=${address}`));
    let result = await res1.json()
    // console.log(result.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos);
    let coordinates = result.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ');
    console.log(coordinates);
    await res.json({ latitude: coordinates[1], longitude: coordinates[0], name: req.session.name, url: '/' })
  })


router.route('/homePage')
  .get((req, res) => {
    res.render('homePage', { doctor: req.session.name })
  })


router.route('/webSocket')
  .get((req, res) => {
    res.render('webSocket')
  })
router.route('/yandex')
  .get((req, res) => {
    res.render('yandex')
  })


module.exports = router;