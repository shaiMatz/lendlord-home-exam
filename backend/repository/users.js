const usersModel = require('../models/users')
const { USER_ROLES } = require('../constants');

class Users {
  // Finds one user based on the given query and projection
  async findOne(query, projection = {}) {
    const user = await usersModel.findOne(query).select(projection)
    return user
  }

  // Finds multiple users based on the given query and projection
  async find(query = {}, projection = {}) {
    return usersModel.find(query).select(projection).exec();
  }

  // Inserts a new user document into the database
  async insertOne(document) {
    if (document.role === USER_ROLES.MANAGER) {
      // Ensure managers do not have a manager assigned
      if (document.manager) {
        throw new Error('A manager cannot have a manager assigned.');
      }
    } else if (document.role === USER_ROLES.WORKER || document.role === USER_ROLES.DRIVER) {
      // Ensure workers and drivers have a valid manager assigned
      if (!document.manager) {
        throw new Error('A manager must be assigned to workers and drivers.');
      }
      const manager = await this.findOne({ _id: document.manager, role: USER_ROLES.MANAGER });
      if (!manager) {
        throw new Error('The assigned manager does not exist or is not a manager.');
      }
    }
    console.log(document)
    const user = new usersModel(document);
    return user.save();
  }

  // Updates a user document based on the given ID and update data
  async updateOne(id, update) {

    console.log("update", update)
    return usersModel.updateOne({ _id: id }, { $set: update });
  }

  // Deletes a user document based on the given ID
  async deleteOne(id) {
    const user = await this.findOne({ _id: id });
    if (user && user.role === USER_ROLES.MANAGER) {
      // If the user is a manager, orphan their employees
      await usersModel.updateMany({ manager: id }, { $set: { manager: null } });
    }
    return usersModel.deleteOne({ _id: id });
  }

  // Finds a manager and their employees based on the manager's ID
  async findManagerAndEmployees(managerId) {
    const manager = await this.findOne({ _id: managerId, role: USER_ROLES.MANAGER });
    const employees = await this.find({ manager: managerId });
    return { manager, employees };
  }
}


module.exports = Users