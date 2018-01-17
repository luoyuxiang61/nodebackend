const layerRoute = require('./api/layerRoute').layerRoute
const commonRoute = require('./api/commonRoute').commonRoute
const fieldRoute = require('./api/fieldRoute').fieldRoute
const resourceRoute = require('./api/resourceRoute').resourceRoute
const quanxianRoute = require('./api/quanxianRoute').quanxianRoute
const sequelize = require('./dao/db').sequelize

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded()



sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

app.use(bodyParser.urlencoded())
app.use(bodyParser.json())



commonRoute(app)
layerRoute(app)
fieldRoute(app)
resourceRoute(app)
quanxianRoute(app)


app.listen(3000)