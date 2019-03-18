const express = require('express');
const app = express();
const redis = require("redis"),
      client = redis.createClient();
const mongoose = require('mongoose');
const egql = require('express-graphql')

mongoose.connect('mongodb://awtian:awtian1@ds121251.mlab.com:21251/sandbox', {useNewUrlParser: true})

const Student = require('./models/Student')

// GRAPHQL
const defaultSchema = require('./gql/schema')
app.use('/graphql', egql({
  schema: defaultSchema,
  graphiql: true
}))


app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {
  res.send('hello active fox')
})

app.get('/students',  (req, res) => {
  client.get("students", (err, reply) => {
    if (reply) {
      res.status(200).send(JSON.parse(reply))
    } else {
    Student.find()
      .then(response => {
        client.set("students", JSON.stringify(response), 'EX', 5)
        res.status(200).send(response)
      })
      .catch(err => {
        res.status(500).send(err)
      })
    }

  })
})

app.post('/students',  (req, res) => {
  Student.create(req.body)
    .then(response => {
      res.status(200).send(response)
    })
    .catch(err => {
      res.status(500).send(err)
    })
})

app.listen(3000, () => {
  console.log('di 3000 cuy')
} )