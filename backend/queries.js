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
        throw error
        }
        response.status(200).json(results.rows)
    })
}

const createUser = (request, response) => {
    const { name, email } = request.body
  
    connectionPool.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [name, email], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added with ID: ${results.rows[0].id}`)
    })
}

const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, email } = request.body
  
    connectionPool.query(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3',
      [name, email, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`User modified with ID: ${id}`)
      }
    )
}

const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)
  
    connectionPool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User deleted with ID: ${id}`)
    })
}

const register = (request, response) => {
    const { username, password, email, name } = request.body
    
    const saltRounds = 10;
    const user = username;
    const myPlaintextPassword = password;

    bcrypt.hash(myPlaintextPassword, saltRounds).then(function(hash) {
        
        connectionPool.query('INSERT INTO users (username, passwordhash, name, email) VALUES ($1, $2, $3, $4) RETURNING *', [username, hash, name, email], (error, results) => {
            if (error) {
                throw error
            }
            response.status(201).send(`User added with ID: ${results.rows[0].id}`)
        }) 
    });
    
}

const login = (request, response) => {
    const { username, password } = request.body

    const myPlaintextPassword = password;

    
    connectionPool.query("SELECT * FROM users WHERE username='" + username + "'", (error, results) => {
        if (error) {
          throw error
        }
        let passwordRetrieved = results.rows[0].passwordhash;

        bcrypt.compare(myPlaintextPassword, passwordRetrieved).then(function(result) {
            
            if(result === true){
                response.status(201).send('Login successfull');
            }
            else{
                response.status(401).send('The login was unsuccessfull');
            }
        });
        
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
}