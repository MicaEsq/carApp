
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
    
    /* request.session.destroy((error) => {
        if(error){
            console.error('error destroying session: ', error);
            // Handle the error appropriately
            response.sendStatus(500);
        }
        else{
            console.log('Session deleted from database successfully');
            // Redirect the user to the login page or any other appropriate action
            response.sendStatus(200);
        }
    }); */
} 

const getCars = (request, response) => {
    connectionPool.query('SELECT * FROM cars ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(results.rows)
    })
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
} 