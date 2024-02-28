Overview
    - Login form on client
    - API for handling user register, login, updating on backend
    - handle logout

Project structure
    - initialize the Project  : npm init -y

backend
    - install backend dependencies : npm i express dotenv mongoose bcryptjs jsonwebtoken cookie-parser
    - create backend folder
    - add server.js file
    - add basic config to test the node server 
        [immg] import express from 'express'

            const port = 5000;

            const app = express();

            app.get('/', (req, res) => {
                res.send('server is ready')
            } )
            app.listen(port, () => {
                console.log(`server started on port ${port}`)
            })
    - add scripts for running server:
        "scripts": {
        "start" : "node backend/server.js",
        "server": "nodemon backend/server.js",
        }
    - add nodemon as a dev dependence: npm i -D nodemon
    - create an env file: .env in the root
        - add port 
        - add add
client

    