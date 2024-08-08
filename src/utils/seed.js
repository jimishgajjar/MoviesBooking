import database from "./../database";
import { addMovie, addUser } from "../services/api";

const initialMovies = [
  {
    title: "Deadpool & Wolverine",
    image_uri:
      "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/deadpool-and-wolverine-et00341295-1718018322.jpg",
    type: "Action/Adventure/Comedy",
    duration: "2h 8m",
    language: "English Tamil, Hindi, Telugu",
    releaseDate: "26 Jul, 2024",
    description:
      "Wolverine is recovering from his injuries when he meets the loudmouth, Deadpool. They team up to defeat a common enemy.",
  },
  {
    title: "JhAuron Mein Kahan Dum Tha",
    image_uri:
      "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/auron-mein-kahan-dum-tha-et00378240-1722408422.jpg",
    type: "Drama/Romantic",
    duration: "2h 25m",
    language: "Hindi",
    releaseDate: "2 Aug, 2024",
    description:
      "Dushman the hum hi apne, auron mein kahan dum tha. Bound by fate. Defined by love!",
  },
  {
    title: "Ulajh",
    image_uri:
      "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/ulajh-et00359267-1720711513.jpg",
    type: "Drama/Thriller",
    duration: "2h 14m",
    language: "Hinidi",
    releaseDate: "2 Aug, 2024",
    description:
      "The journey of a young diplomat, belonging to a prominent family of patriots, who gets embroiled in a dangerous personal conspiracy far from her home, at a career-defining post.",
  },
  {
    title: "Vaar Tahevaar",
    image_uri:
      "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/vaar-tahevaar-et00403073-1720684240.jpg",
    type: "Comedy/Drama/Family",
    duration: "2h 7m",
    language: "Hindi",
    releaseDate: "25 Aug, 2024",
    description:
      "Preetal and Shubh are focused on earning money and achieving their goals, but getting married is not a priority to them. Determined to change Preetal and Shubh's mindsets, their families convince them to attend the grand Holi festival along with Shiv and Shivani's wedding. Will their mindset change?",
  },
  {
    title: "Bad Newz",
    image_uri:
      "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/bad-newz-et00391805-1721214274.jpg",
    type: "Comedy/Drama",
    duration: "2h 7m",
    language: "Hindi",
    releaseDate: "19 Jul, 2024",
    description:
      "Bad Newz is a bizarre, rare comedy about heteropaternal superfecundation! A twist of fate leads to Saloni Bagga`s twin pregnancy being fathered by both Akhil Chadha and Gurbir Pannu, setting off a chaotic rivalry for her love and their children. As Akhil and Gurbir vie for Saloni`s affections, chaos ensues.",
  },
];

const initialUsers = [
  {
    firstName: "Test",
    lastName: "Test",
    email: "test@gmail.com",
    mobile: "9737956805",
    password: "password",
  },
  {
    firstName: "Jimish",
    lastName: "Gajjar",
    email: "jimish.gajjar@gmail.com",
    mobile: "9737956805",
    password: "123456",
  },
];

async function seedDatabase() {
  console.log("Starting seedDatabase");

  const moviesCollection = await database.get("movies").query().fetch();
  const usersCollection = await database.get("users").query().fetch();

  console.log("USER COLLECTION COUNT:- ", usersCollection.length);
  console.log(
    "USER COLLECTION:- ",
    usersCollection.map((usersCollection) => usersCollection._raw)
  );
  if (usersCollection.length === 0) {
    initialUsers.forEach((user, index) => {
      addUser(user);
    });
  }

  console.log("MOVIES COLLECTION COUNT:- ", moviesCollection.length);
  console.log(
    "MOVIES COLLECTION:- ",
    moviesCollection.map((moviesCollection) => moviesCollection._raw)
  );
  if (moviesCollection.length === 0) {
    initialMovies.forEach((movie, index) => {
      addMovie(movie);
    });
  }

  console.log("Completed seeding database");
}

export default seedDatabase;
