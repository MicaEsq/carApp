
const connectionPool = require('../backend/util/dbConnection');
const bcrypt = require('bcrypt');



const getUsers = (request, response) => {
    connectionPool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}

const getUserById = (request, response) => {
    const id = parseInt(request.params.id)

    connectionPool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            response.status(404).send({message: `The is no user with id: ${id}`})
        }
        else{
            response.status(200).send({message: results.rows})
        }
        
    })
}

const createUser = (request, response) => {
    const { name, email } = request.body
  
    connectionPool.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [name, email], (error, results) => {
      if (error) {
        response.status(404).send({message:`User could not be added`})
      }
      else{
        response.status(201).send({message:`User added with ID: ${results.rows[0].id}`})
      }
      
    })
}

const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, email } = request.body
  
    connectionPool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3', [name, email, id], (error, results) => {
        if (error) {
            response.status(400).send({message:`User could not be modified`})
        }
        else{
            response.status(200).send({message:`User modified with ID: ${id}`})
        }
      }
    )
}

const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)
  
    connectionPool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        response.status(400).send({message:`User could not be deleted`})
      }
      else{
        response.status(200).send({message:`User deleted with ID: ${id}`})
      }
      
    })
}

const register = (request, response) => {
    const { username, password, email, name } = request.body
    
    const saltRounds = 10;

    bcrypt.hash(password, saltRounds).then(function(hash) {
        
        connectionPool.query('INSERT INTO users (username, passwordhash, name, email) VALUES ($1, $2, $3, $4) RETURNING *', [username, hash, name, email], (error, results) => {
            if (error) {
                response.status(400).send({message:`The user could not be created`})
            }
            else{
                response.status(201).send({message:`User added with ID: ${results.rows[0].id}`})
            }
            
        }) 
    });
}

const login = (request, response, next) => {
    const { username, password } = request.body
    
    connectionPool.query("SELECT * FROM users WHERE username='" + username + "'", (error, results) => {
        if (error) {
            response.status(401).send({message: 'The login was unsuccessfull 1'});
        }
        else{
            if(results.rows.length === 0){
                response.status(401).send({message: 'The login was unsuccessfull 2'});
            }
            else{
                let passwordRetrieved = results.rows[0].passwordhash;

                bcrypt.compare(password, passwordRetrieved).then(function(result) {
                    
                    if(result === true){

                        response.status(200).send({message: 'Login successfull'});
                    }
                    else{
                        response.status(401).send({message: 'The login was unsuccessfull 3'});
                    }
                });
            }
            
        }
    })
} 

const logout = (request, response) => {
    
    //request.session.destroy((error) => {
        /* if(error){
            console.error('error destroying session: ', error);
            // Handle the error appropriately
            response.sendStatus(500);
        }
        else{ */
            console.log('Session deleted from database successfully');
            // Redirect the user to the login page or any other appropriate action
            response.sendStatus(200);
        //}
    //}); 
} 

const getCars = (request, response) => {
    const brands = request.query.brands;
    const models = request.query.models;
    const year = request.query.year;
    const states = request.query.states;
    const cities = request.query.cities;
    const transmission = request.query.transmission;
    const price = request.query.price;
    const mileage = request.query.mileage;
    
    let filtersQuery = '';
    let query = [];
    if(brands){
        query.push(`b.name = '${brands}'`);
    }
    if(models){
        query.push(`m.name = '${models}'`);
    }
    if(year){
        query.push(`year = '${year}'`);
    }
    if(states){
        query.push(`s.name = '${states}'`);
    }
    if(cities){
        query.push(`ci.name = '${cities}'`);
    }
    if(transmission){
        query.push(`transmission = '${transmission}'`);
    }
    if(price){
        query.push(`price = '${price}'`);
    }
    if(mileage){
        query.push(`mileage = '${mileage}'`);
    } 

    
    for(var i=0; i<query.length; i++){
        if(i === 0){
            filtersQuery += 'WHERE ' + query[i]
        }
        else{
            filtersQuery += ' AND ' + query[i]
        }
    }
    
   
    connectionPool.query(`SELECT c.id, ci.name AS city_name, s.name AS state_name, c.year, b.name AS brand_name, m.name AS model_name, c.version, c.transmission, c.condition, c.price, c.mileage, c.image, c.promoted, c.financing
        FROM cars c
        JOIN cities ci ON c.city_id = ci.id
        JOIN states s ON c.state_id = s.id
        JOIN brands b ON c.brand_id = b.id
        JOIN models m ON c.model_id = m.id ` + filtersQuery, (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(results.rows)
    })
}

const getCarById = (request, response) => {
    const id = parseInt(request.params.id)

    connectionPool.query(`SELECT 
            c.id,
            json_build_object('id', ci.id, 'name', ci.name) AS city,
            json_build_object('id', s.id, 'name', s.name) AS state,
            c.year,
            json_build_object('id', b.id, 'name', b.name) AS brand,
            json_build_object('id', m.id, 'name', m.name) AS model,
            c.version,
            c.transmission,
            c.condition,
            c.price,
            c.mileage,
            c.image,
            c.promoted,
            c.financing,
            c.observation,
            c.color,
            c.capacity,
            c.fuel
        FROM
            cars c
            LEFT JOIN cities ci ON c.city_id = ci.id
            LEFT JOIN states s ON c.state_id = s.id
            LEFT JOIN brands b ON c.brand_id = b.id
            LEFT JOIN models m ON c.model_id = m.id
        WHERE
            c.id = $1;`, [id], (error, results) => {
    
        if (error) {
            response.status(404).send({message: `There is no car with id: ${id}`})
            throw error;
        }
        else if(results.rows[0] === undefined){
            response.status(404).send({message: `There is no car with id: ${id}`})
        }
        else{
            response.status(200).send(results.rows[0])
        }
        
    })
}

const createCar = (request, response) => {
    const { brand_id, model_id, state_id, city_id, year, version, transmission, condition, price, mileage, promoted,financing, observation, color, capacity, fuel } = request.body
   
    connectionPool.query('INSERT INTO cars (brand_id, model_id, state_id, city_id, year, version, transmission, condition, price, mileage, promoted,financing, observation, color, capacity, fuel) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) RETURNING *', [brand_id, model_id, state_id, city_id, year, version, transmission, condition, price, mileage, promoted,financing, observation, color, capacity, fuel], (error, results) => {
      if (error) {
        response.status(404).send({message:`Car could not be added`})
        throw error;
      }
      else{
        response.status(200).send({id:`${results.rows[0].id}`})
      }
      
    })
}

const updateCar = (request, response) => {
    const id = parseInt(request.params.id)
    const updatedData = request.body

    let query = 'UPDATE cars SET';
    const updateParams = [];
    Object.keys(updatedData).forEach((attribute, index) => {
        query += ` ${attribute} = $${index + 1},`;
        updateParams.push(updatedData[attribute]);
    });

    query = query.slice(0, -1); //remove las added comma
    query += ' WHERE id = $' + (updateParams.length + 1) +';';
    updateParams.push(id);
    
    connectionPool.query(query, updateParams, (error, results) => {
        if (error) {
            response.status(400).send({message:`Car with id: ${id} could not be modified ${error}`})
        }
        else{
            response.status(200).send({message:`Car with id: ${id} was successfully be modified`})
        }
      }
    )
}

const deleteCar = (request, response) => {
    const id = parseInt(request.params.id)
  
    connectionPool.query('DELETE FROM cars WHERE id = $1', [id], (error, results) => {
      if (error) {
        response.status(400).send({message:`Car with id: ${id} could not be deleted`})
      }
      else{
        response.status(200).send({message:`The car with id: ${id} was successfully deleted`})
      }
      
    })
}

const getBrands = (request, response) => {
   
    connectionPool.query(`SELECT * FROM brands;`, (error, results) => {
        if (error) {
          throw error
        }

        /* let columns = [];
        for(var i=0; i<results.rows.length; i++){
            columns.push(results.rows[i].column_name)
        }  */
        response.status(200).send(results.rows)
    })
}

const getStates = (request, response) => {
   
    connectionPool.query(`SELECT * FROM states;`, (error, results) => {
        if (error) {
          throw error
        }
        
        response.status(200).send(results.rows)
    })
} 

const getFilters = (request, response) => {
    const { type, primaryFilter } = request.query;

    if(primaryFilter === ''){
        connectionPool.query('SELECT * FROM ' + type + ';', (error, results) => {
            if (error) {
            throw error
            }
            response.status(200).send(results.rows)
        })
    }
    else if(type === 'models' || type === 'cities'){
        let typePrimaryFilter = '';
        if(type === "models"){
            typePrimaryFilter = 'brand'
        }
        else if(type === "cities"){
            typePrimaryFilter = 'state'
        }

        connectionPool.query('SELECT * FROM ' + type + ' WHERE ' + typePrimaryFilter + '_id = ' + primaryFilter + ';', (error, results) => {
            if (error) {
                response.status(500).send({message:`Problem with the query`})
            throw error
            }
            response.status(200).send(results.rows)
        })
    }
    else if(type === 'brands' || type === 'states'){
        let typePrimaryFilter = '';
        if(type === "brands"){
            typePrimaryFilter = 'models'
            connectionPool.query(`SELECT models.brand_id AS id, brands.name AS name
            FROM models
            JOIN brands ON models.brand_id = brands.id
            WHERE models.name = '` + primaryFilter + `';`, (error, results) => {
                if (error) {
                throw error
                }
                response.status(200).send(results.rows);
            })
        }
        else if(type === "states"){
            typePrimaryFilter = 'cities'
            connectionPool.query(`SELECT cities.state_id AS id, states.name AS name
            FROM cities
            JOIN states ON cities.state_id = states.id
            WHERE cities.id = '` + primaryFilter + `';`, (error, results) => {
                if (error) {
                throw error
                }
                response.status(200).send(results.rows);
            })
        }
    }
}


module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    login,
    register,
    logout,
    getCars,
    getFilters,
    getCarById,
    createCar,
    updateCar,
    deleteCar
} 