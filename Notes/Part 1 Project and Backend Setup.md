# Overview
- Login form on client
- API for handling user register, login, updating on backend
- handle logout

# Project initialization
- initialize the Project

		root: npm init -y

- add the type : modules configuration to the package.json file to use "import" syntax rather than "require" syntax

		"type": "modules",

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

## MVC setup
- create folder for "routes" in the backend folder
- add the file "userRoutes.js"
- create a folder for "controllers" in the backend folder
- add the file "userController.js"

- set up the initial controller for testing "userController.js"

		//  @desc   Auth user/set token
		//  @route   POST /api/users/auth
		//  @access Public
		const authUser = (req, res) => {    
			res.status(200).json({ message: 'Auth User' })
		}
		
		export {
		    authUser,
		}
    
- Create the initial route for testing "userRoutes.js"

		import express from 'express';
		const router = express.Router()
		import {authUser} from '../controllers/userController.js';

		// uses the express router, adds a post request to '/auth' that calls the authUser controller function that is imported
		router.post('/auth', authUser)
		
		// exports the entire router with all added methods/routes
		export default router;

- Test the authentication route use Postman or Thunderclient in VSCode
	- set up a new environment called "MERN Auth"
	- add a variable called "baseURL" and set the value to "http://localhost:8000/api"
	- add a new POST request to {{baseURL}}/users

- you should see the response:

		{
  			"message": "Auth User"
		}
- save the request in a new collection called "Users" to reuse if needed

## configure Async handler

- async before controller functions

			const authUser = async (req, res) => {

- install async handler

		npm i express-async-handler
- restart the server

- import the package into the controller files

			import asyncHandler from 'express-async-handler';
- wrap the entire controller function in the async handler

			const authUser = asyncHandler(async(req, res) => {
			    res.status(200).json({ message: 'Auth User' })
			})

## Create middleware
- Create a folder called "middleware"
- create a file called "errorMiddleware.js"
- in the file, create two error methods

		const notFound = (req, res, next) => {

    		const error = new Error(`Not Found - ${req.originalURL}`)
  	  		res.status(404)
    		next(error)

		}

		const errorHandler = (err, req, res, next) => {
    		let statusCode = res.statusCode === 200 ? 500 : res.statusCode
	    	let message = err.message
    
    		if(err.name === 'CastError' && err.kind === 'ObjectId'){
        		statusCode = 404
        		message ='Resource not found'
    		}

	    	res.status(statusCode).json({
    		    message,
       			stack: ProcessingInstruction.env.Node_ENV === 'production' ? null : err.stack
    		})
		}

		export {
    		notFound, 
    		errorHandler	
		}

- The notFound metthod sets an error with a message that the url is not found and an error status of 404, then calls the callback function with the error provided
- the errorHandler method takes in the error message, checks if the status is good (200) and sets it to 500 or the status of the current response. It sets a message to the value provided by the error. If the error's name is "CastError" and the error kind is 'ObjectId' (look this up) then the status is changed to 404 and the message is updated.
it then sets the res status to the new code and replies with json of the message and a stack trace if in development

- Add the error handlers to the server.js file

		import { notFound, errorHandler} from './middleware/errorMiddleware.js'

		app.use(notFound)
		app.use(errorHandler)

## Adding Route and Controller Structure

- In the userRoutes file, configure the core strucutre of the routes needed:

		import asyncHandler from 'express-async-handler';

		//  @desc   Auth user/set token
		//  @route  POST /api/users/auth
		//  @access Public
		const authUser = asyncHandler(async(req, res) => {
		    res.status(200).json({ message: 'Auth User' })
		})

		//  @desc   Register new user
		//  @route  POST /api/users
		//  @access Public
		const registerUser = asyncHandler(async(req, res) => {    		
    		res.status(200).json({ message: 'Register User' })
		})

		//  @desc   Logout user
		//  @route  POST /api/users/logout
		//  @access Public
		const logoutUser = asyncHandler(async(req, res) => {
 		   res.status(200).json({ message: 'Logout User' })
		})

		//  @desc   Get user profile
		//  @route  GET /api/users/profile
		//  @access Private
		const getUserProfile = asyncHandler(async(req, res) => {
  		  res.status(200).json({ message: 'Get User Profile' })
		})

		//  @desc   Update user profile
		//  @route  PUT /api/users/profile
		//  @access Private
		const updateUserProfile = asyncHandler(async(req, res) => {
  		  res.status(200).json({ message: 'Update user profile' })
		})

		export {
		    authUser,
  			registerUser,
  		  	logoutUser,
  		  	getUserProfile,
  		  	updateUserProfile,
		}

- This adds an 
	- authenticate user (login), 	
	- register user, 
	- logout user, 
	- get user profile, 
	- and update user profile methods

- Add the controller functions to the routes file

		import express from 'express';
		
		const router = express.Router()
		
		import {
			authUser,
			registerUser,
    		logoutUser,
			getUserProfile,
    		updateUserProfile,
		} from '../controllers/userController.js';

		// uses the express router, adds a post request to '/auth' that calls the authUser controller function that is imported
		router.post('/', registerUser)
		router.post('/auth', authUser)
		router.post('/logout', logoutUser)
		router.route('/profile').get(getUserProfile).put(updateUserProfile)

		// exports the entire router with all added methods/routes

		export default router;

- Then user Postman or Thunderclient to validate the endpoints
	- Login User: 
				
			POST {{baseURL}}/users/auth 
	- Register User
			
			POST {{baseURL}}/users
	- Logout User

			POST {{baseURL}}/users/logout 
	-  Get User Profile

			GET {{baseURL}}/users/profile
	- Update User Profile

			PUT {{baseURL}}/users/profile 

