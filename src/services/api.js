import axios from "axios";
import { API_URL } from "@env";

const fetchMovies = async () => {
  try {
    const response = await axios.get(`${API_URL}/movies`);
    return response.data;
  } catch (error) {
    console.error("Error fetching movies from JSON Server:", error);
    throw error;
  }
};

const fetchUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users from JSON Server:", error);
    throw error;
  }
};

const addUser = async (user) => {
  try {
    const response = await axios.post(`${API_URL}/users`, user);
    return response.data;
  } catch (error) {
    console.error("Error adding user to JSON Server:", error);
    throw error;
  }
};

const loginUser = async (email, password) => {
  try {
    const users = await fetchUsers();

    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      return user;
    } else {
      throw new Error("Invalid email or password");
    }
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export { fetchMovies, fetchUsers, addUser, loginUser };
