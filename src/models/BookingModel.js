// BookingModel.js
import { Model } from "@nozbe/watermelondb";
import { field, relation } from "@nozbe/watermelondb/decorators";

class BookingModel extends Model {
  static table = "bookings";

  @field("user_id") userId; // Foreign key relation to users
  @field("movie_id") movieId; // Foreign key relation to movies
  @field("number_of_people") numberOfPeople;
  @field("number_of_children") numberOfChildren;
  @field("number_of_tickets") numberOfTickets;
  @field("booking_date") bookingDate; // Stored as a string in "DD-MM-YYYY" format
}

export default BookingModel;
