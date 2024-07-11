import axios from 'axios';
import { getHeaders } from '../shared/headers';

const API_URL = process.env.REACT_APP_API_URL;

export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`, { headers: getHeaders() });
    return response.data;
  } catch (error) {
    console.error('Error fetching users', error);
    throw error;
  }
};

export const getUserById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/user/${id}`, { headers: getHeaders() });
    return response.data;
  } catch (error) {
    console.error('Error fetching user', error);
    throw error;
  }
};

export const createUser = async (user) => {
  try {
    const response = await axios.post(`${API_URL}/users`, user, { headers: getHeaders() });
    return response.data;
  } catch (error) {
    console.error('Error creating user', error);
    throw error;
  }
};

export const updateUser = async (id, user) => {
  try {
    console.log("user in update user", user)
    const response = await axios.put(`${API_URL}/user/${id}`, { headers: getHeaders() });
    return response.data;
  } catch (error) {
    console.error('Error updating user', error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/user/${id}`, { headers: getHeaders() });
    return response.data; 
  } catch (error) {
    console.error('Error deleting user', error); // Log error to console for debugging
    throw error; 
};

}