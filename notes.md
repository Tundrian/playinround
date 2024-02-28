# Overview
- Login form on client
- API for handling user register, login, updating on backend
- handle logout

# Project initialization
- initialize the Project

		root: npm init -y

# Backend
## Initial Server Config and Testting
   - install backend dependencies
							
			root: npm i express dotenv mongoose bcryptjs jsonwebtoken cookie-parser
			root: npm i -D nodemon

- create backend folder
	
		mkdir backend

- add server.js file

		cd backend
		touch server.js

- add basic config to test the node server 
        
		import express from 'express'

         const port = 5000;

         const app = express();

         app.get('/', (req, res) => {
             res.send('server is ready')
         } )

         app.listen(port, () => {
             console.log(`server started on port ${port}`)
         })

- add scripts for running server in the package.json
		
        "scripts": {
        "start" : "node backend/server.js",
        "server": "nodemon backend/server.js",
        }
    
    - create an env file: ".env" in the root directory
    
			PORT=8000 
        	NODE_ENVIRONMENT=development

- Make a ".gitignore" file in the root

		node_modules/
		.env
    