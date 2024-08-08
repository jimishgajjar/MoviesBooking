// api.js
import database from "../database"; // Make sure this import path matches your setup

// Movies CRUD Operations
export async function addMovie(movieData) {
  await database.write(async () => {
    const newMovie = await database.get("movies").create((movie) => {
      movie.title = movieData.title;
      movie.image_uri = movieData.image_uri;
      movie.type = movieData.type;
      movie.duration = movieData.duration;
      movie.language = movieData.language;
      movie.releaseDate = movieData.releaseDate;
      movie.description = movieData.description;
    });
    console.log("Inserted New Movie: ", newMovie);
    return newMovie;
  });
}

export async function updateMovie(movieId, updatedData) {
  await database.write(async () => {
    const movie = await database.collections.get("movies").find(movieId);
    await movie.update((movie) => {
      movie.title = updatedData.title || movie.title;
      movie.image_uri = updatedData.image_uri || movie.image_uri;
      movie.type = updatedData.type || movie.type;
      movie.duration = updatedData.duration || movie.duration;
      movie.language = updatedData.language || movie.language;
      movie.releaseDate = updatedData.releaseDate || movie.releaseDate;
      movie.description = updatedData.description || movie.description;
    });
  });
}

export async function deleteMovie(movieId) {
  await database.write(async () => {
    const movie = await database.collections.get("movies").find(movieId);
    await movie.destroyPermanently();
  });
}

export async function getAllMovies() {
  const moviesCollection = await database.get("movies").query().fetch();
  const movies = moviesCollection.map(
    (moviesCollection) => moviesCollection._raw
  );
  return movies;
}

export async function getMovieById(movieId) {
  try {
    // Fetch the movie from the database using the provided movieId
    const movie = await database.get("movies").find(movieId);

    // Return the movie details
    return movie;
  } catch (error) {
    console.error("Error fetching movie:", error);
    throw new Error("Unable to fetch the movie details");
  }
}

// Users CRUD Operations
export async function addUser(userData) {
  await database.write(async () => {
    const newUser = await database.get("users").create((user) => {
      user.firstName = userData.firstName;
      user.lastName = userData.lastName;
      user.email = userData.email;
      user.mobile = userData.mobile;
      user.password = userData.password;
    });
    console.log("Inserted New User: ", newUser);
    return newUser;
  });
}

export async function updateUser(userId, updatedData) {
  await database.write(async () => {
    const user = await database.collections.get("users").find(userId);
    await user.update((user) => {
      user.firstName = updatedData.firstName || user.firstName;
      user.lastName = updatedData.lastName || user.lastName;
      user.email = updatedData.email || user.email;
      user.mobile = updatedData.mobile || user.mobile;
      user.password = updatedData.password || user.password;
    });
  });
}

export async function deleteUser(userId) {
  await database.write(async () => {
    const user = await database.collections.get("users").find(userId);
    await user.destroyPermanently();
  });
}

// Bookings CRUD Operations
export async function addBooking(bookingData) {
  let newBooking = null;
  await database.write(async () => {
    newBooking = await database.get("bookings").create((booking) => {
      booking.userId = bookingData.userId;
      booking.movieId = bookingData.movieId;
      booking.numberOfPeople = bookingData.numberOfPeople;
      booking.numberOfChildren = bookingData.numberOfChildren;
      booking.numberOfTickets = bookingData.numberOfTickets;
      booking.bookingDate = bookingData.bookingDate;
    });
    console.log("Inserted New Booking: ", newBooking);
  });
  return newBooking;
}

export async function updateBooking(bookingId, updatedData) {
  await database.write(async () => {
    const booking = await database.collections.get("bookings").find(bookingId);
    await booking.update((booking) => {
      if (updatedData.userId) booking.user.set(updatedData.userId);
      if (updatedData.movieId) booking.movie.set(updatedData.movieId);
      booking.numberOfPeople =
        updatedData.numberOfPeople || booking.numberOfPeople;
      booking.numberOfChildren =
        updatedData.numberOfChildren || booking.numberOfChildren;
      booking.numberOfTickets =
        updatedData.numberOfTickets || booking.numberOfTickets;
      booking.bookingDate = updatedData.bookingDate || booking.bookingDate;
    });
  });
}

export async function deleteBooking(bookingId) {
  await database.write(async () => {
    const booking = await database.collections.get("bookings").find(bookingId);
    await booking.destroyPermanently();
  });
}

export async function getBookingsByUserId(userId) {
  try {
    // Fetch all bookings from the database
    const bookings = await database.get("bookings").query().fetch();

    // Filter bookings by the provided userId
    const userBookings = bookings.filter(
      (booking) => booking.userId === userId
    );

    // Return the list of bookings for the user
    return userBookings;
  } catch (error) {
    console.error("Error fetching bookings for user:", error);
    throw new Error("Unable to fetch bookings for the user");
  }
}

export async function loginUser(email, password) {
  const users = await database.get("users").query().fetch();
  const user = users.find(
    (user) => user.email === email && user.password === password
  );

  if (user) {
    return user;
  } else {
    throw new Error("Invalid email or password");
  }
}
