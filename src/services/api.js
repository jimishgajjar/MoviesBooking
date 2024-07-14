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

const updateUser = async (updatedUserData) => {
  try {
    const response = await axios.get(`${API_URL}/users/${updatedUserData.id}`);
    const user = response.data;

    if (!user) {
      throw new Error("User not found");
    }

    const updatedUser = {
      ...user,
      ...updatedUserData,
    };

    await axios.put(`${API_URL}/users/${updatedUserData.id}`, updatedUser);

    return updatedUser;
  } catch (error) {
    console.error("Error updating user:", error);
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

const addBookingToUser = async (bookingData) => {
  try {
  } catch (error) {
    console.error("Error adding booking to user:", error);
    throw error;
  }
  //   const users = await fetchUsers();
  //   const user = users.find((u) => u.id === userId);

  //   if (!user) {
  //     throw new Error("User not found");
  //   }

  //   const updatedUser = {
  //     ...user,
  //     bookings: user.bookings ? [...user.bookings, booking] : [booking],
  //   };

  //   const response = await axios.put(`${API_URL}/users/${userId}`, updatedUser);
  //   return response.data;
  // } catch (error) {
  //   console.error("Error adding booking to user:", error);
  //   throw error;
  // }
};

export {
  fetchMovies,
  fetchUsers,
  addUser,
  updateUser,
  loginUser,
  addBookingToUser,
};
