import { appSchema, tableSchema } from "@nozbe/watermelondb";

// Combined Schema
export const mySchema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: "movies",
      columns: [
        { name: "title", type: "string" },
        { name: "image_uri", type: "string" },
        { name: "type", type: "string" },
        { name: "duration", type: "string" },
        { name: "language", type: "string" },
        { name: "release_date", type: "string" },
        { name: "description", type: "string" },
      ],
    }),
    tableSchema({
      name: "users",
      columns: [
        { name: "first_name", type: "string" },
        { name: "last_name", type: "string" },
        { name: "email", type: "string" },
        { name: "mobile", type: "string" },
        { name: "password", type: "string" },
      ],
    }),
    tableSchema({
      name: "bookings",
      columns: [
        { name: "user_id", type: "string", isIndexed: true }, // Foreign key to users
        { name: "movie_id", type: "string", isIndexed: true }, // Foreign key to movies
        { name: "number_of_people", type: "number" },
        { name: "number_of_children", type: "number" },
        { name: "number_of_tickets", type: "number" }, // Optional
        { name: "booking_date", type: "string" }, // Store as a string for date in "DD-MM-YYYY" format
      ],
    }),
  ],
});
