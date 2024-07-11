const { ObjectId } = require('mongodb')
const Users = require('../lib/users')
const users = new Users()

/**
 * Gets user by id
 */
exports.getUserById = async ctx => {
  const { id } = ctx.params
  try {
    console.log(1)
    const user = await users.findUser({ _id: new ObjectId(id) })
      if (!user) {
      ctx.status = 401;
      ctx.body = 'User not found';
      return;
    }
    ctx.status = 200
    ctx.body = user  
  } catch (err) {
    ctx.status = err.status || 500
    ctx.message = err.message || 'Internal server error'
  }
}

// Controller to handle getting all users
exports.getAllUsers = async ctx => {
  try {
    const allUsers = await users.findAllUsers();
    ctx.status = 200;
    ctx.body = allUsers;
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.message || 'Internal server error';
  }
};

// Controller to handle creating a new user
exports.createUser = async ctx => {
  try {
    const newUser = ctx.request.body;
    const result = await users.createUser(newUser);
    ctx.status = 201;
    ctx.body = result;
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.message || 'Internal server error';
  }
};

// Controller to handle updating a user by ID
exports.updateUser = async ctx => {
  const { id } = ctx.params;
  try {
    const updateData = ctx.request.body;
    const result = await users.updateUser(id, updateData);
    if (result.nModified === 0) {
      ctx.status = 401;
      ctx.body = 'User not found';
      return;
    }
    ctx.status = 200;
    ctx.body = 'User updated successfully';
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.message || 'Internal server error';
  }
};

// Controller to handle deleting a user by ID
exports.deleteUser = async ctx => {
  const { id } = ctx.params;
  try {
    const result = await users.deleteUser(id);
    if (result.deletedCount === 0) {
      ctx.status = 401;
      ctx.body = 'User not found';
      return;
    }
    ctx.status = 200;
    ctx.body = 'User deleted successfully';
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.message || 'Internal server error';
  }
};

// Controller to handle getting a manager and their employees by manager ID
exports.getManagerAndEmployees = async ctx => {
  const { id } = ctx.params;
  try {
    console.log("id: ", id)
    const result = await users.findManagerAndEmployees(id);
    if (!result.manager) {
      ctx.status = 401;
      ctx.body = 'Manager not found';
      return;
    }
    ctx.status = 200;
    ctx.body = result;
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.message || 'Internal server error';
  }
};


async function initialize() {
  await users.initialize();
}


initialize()