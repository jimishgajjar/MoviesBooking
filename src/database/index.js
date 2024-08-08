// database.js
import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";
import { mySchema } from "./schema"; // Correct path
import UserModel from "../models/UserModel";
import MovieModel from "../models/MovieModel";
import BookingModel from "../models/BookingModel";

const adapter = new SQLiteAdapter({
  schema: mySchema, // Include the schema here
});

const database = new Database({
  adapter,
  modelClasses: [UserModel, MovieModel, BookingModel], // Include the model classes here
});

export default database;
