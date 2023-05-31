const express = require('express');
const bodyParser = require('body-parser');
var cookieparser = require('cookie-parser');
const db = require('./queries');
const cors = require('cors');
const app = express();
const port = 3001

const corsOptions ={
    origin:'http://localhost:3000', 
    //credentials: true,
    //optionSuccessStatus:200
}


app.use(cookieparser());
app.use(cors(corsOptions));
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)


app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)
app.post('/register', db.register)
app.post('/login', db.login) 
app.get('/logout', db.logout)
app.get('/cars', db.getCars)
app.post('/newCar', db.createCar)
app.post('/filters', db.getFilters)
//app.get('/brands', db.getBrands)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})