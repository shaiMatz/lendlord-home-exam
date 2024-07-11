const Router = require('koa-router')
const router = new Router()

const ctrl =  require('../controllers/users')

// Get a user by ID
router.get('/user/:id', ctrl.getUserById)

// Get all users
router.get('/users', ctrl.getAllUsers);

// Create a new user
router.post('/users', ctrl.createUser);

// Update a user by ID
router.put('/user/:id', ctrl.updateUser);

// Delete a user by ID
router.delete('/user/:id', ctrl.deleteUser);

// Get a manager and their employees by manager ID
router.get('/managers/:id/employees', ctrl.getManagerAndEmployees);

router.allowedMethods()

module.exports = router
