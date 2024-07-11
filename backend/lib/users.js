const UsersRepo = require('../repository/users')


class Users {
  // Initializes the repository
  async initialize() {
    this.repo = new UsersRepo()
  }
  
  // Finds a user based on the given query and projection
  async findUser(query, projection = {}) {
    const user = await this.repo.findOne(query)
    return user
  }

  // Finds all users
  async findAllUsers() {
    return this.repo.find();
  }

  // Creates a new user
  async createUser(user) {
    return this.repo.insertOne(user);
  }

  // Updates a user based on the given ID and update data
  async updateUser(id, update) {
    return this.repo.updateOne(id, update);
  }

  // Deletes a user based on the given ID
  async deleteUser(id) {
    return this.repo.deleteOne(id);
  }

  // Finds a manager and their employees based on the manager's ID
  async findManagerAndEmployees(managerId) {
    return this.repo.findManagerAndEmployees(managerId);
  }
}


module.exports = Users