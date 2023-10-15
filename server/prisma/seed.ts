import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Users
  const users = await prisma.user.createMany({
    data: [
      { name: 'John Doe', email: 'john@example.com', password: 'password123', role: 'REGULAR' },
      { name: 'Jane Smith', email: 'jane@example.com', password: 'password456', role: 'ADMIN' },
      { name: 'Alice Johnson', email: 'alice@example.com', password: 'password789', role: 'REGULAR' },
      { name: 'Bob Brown', email: 'bob@example.com', password: 'password012', role: 'REGULAR' },
      { name: 'Charlie Davis', email: 'charlie@example.com', password: 'password345', role: 'REGULAR' },
    ],
  });

  // Genres
  const genres = await prisma.genre.createMany({
    data: [
      { name: 'Action' },
      { name: 'Drama' },
      { name: 'Comedy' },
      { name: 'Horror' },
      { name: 'Sci-Fi' },
    ],
  });

  // Ratings
  const ratings = await prisma.rating.createMany({
    data: [
      { name: 'G' },
      { name: 'PG' },
      { name: 'PG-13' },
      { name: 'R' },
      { name: 'NC-17' },
    ],
  });

  // Movies
  const movies = await prisma.movie.createMany({
    data: [
      { title: 'Inception', poster: 'https://www.joblo.com/wp-content/uploads/2010/05/inception-poster1-1.jpg', description: 'A movie about dreams.', imdb: 'tt1375666', director: 'Christopher Nolan', actors: 'Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page', duration: '148 min', start_date: new Date(), genreId: 1, ratingId: 3 },
      { title: 'The Matrix', poster: 'https://www.themoviedb.org/t/p/original/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg', description: 'A computer hacker learns about the true nature of his reality.', imdb: 'tt0133093', director: 'The Wachowskis', actors: 'Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss', duration: '136 min', start_date: new Date(), genreId: 5, ratingId: 3 },
      { title: 'The Shawshank Redemption', poster: 'https://m.media-amazon.com/images/I/71JxA6I+sgL._AC_UF894,1000_QL80_.jpg', description: 'Two imprisoned men bond over a number of years.', imdb: 'tt0111161', director: 'Frank Darabont', actors: 'Tim Robbins, Morgan Freeman', duration: '142 min', start_date: new Date(), genreId: 2, ratingId: 2 },
      { title: 'The Godfather', poster: 'https://media.posterlounge.com/img/products/710000/707663/707663_poster.jpg', description: 'The aging patriarch of an organized crime dynasty transfers control of his empire to his son.', imdb: 'tt0068646', director: 'Francis Ford Coppola', actors: 'Marlon Brando, Al Pacino, James Caan', duration: '175 min', start_date: new Date(), genreId: 2, ratingId: 4 },
      { title: 'Toy Story', poster: 'https://lumiere-a.akamaihd.net/v1/images/p_toystory_19639_424d94a0.jpeg', description: 'A cowboy doll is threatened by a new spaceman figure.', imdb: 'tt0114709', director: 'John Lasseter', actors: 'Tom Hanks, Tim Allen', duration: '81 min', start_date: new Date(), genreId: 3, ratingId: 1 },
    ],
  });

  // Rooms
  const rooms = await prisma.room.createMany({
    data: [
      { name: 'Room A', seats: 100 },
      { name: 'Room B', seats: 80 },
      { name: 'Room C', seats: 120 },
      { name: 'Room D', seats: 90 },
      { name: 'Room E', seats: 110 },
    ],
  });

  // Projections
  const projections = await prisma.projection.createMany({
    data: [
      { movieId: 1, roomId: 1, time: new Date(), available_seats: 100 },
      { movieId: 2, roomId: 2, time: new Date(), available_seats: 80 },
      { movieId: 3, roomId: 3, time: new Date(), available_seats: 120 },
      { movieId: 4, roomId: 4, time: new Date(), available_seats: 90 },
      { movieId: 5, roomId: 5, time: new Date(), available_seats: 110 },
    ],
  });

  // Tickets
  const tickets = await prisma.ticket.createMany({
    data: [
      { projectionId: 1, userId: 1, price: 10.5 },
      { projectionId: 2, userId: 2, price: 11.0 },
      { projectionId: 3, userId: 3, price: 9.5 },
      { projectionId: 4, userId: 4, price: 12.0 },
      { projectionId: 5, userId: 5, price: 10.0 },
    ],
  });

  // Refresh Tokens (for demonstration, not linking to any specific user for simplicity)
  /* const refreshTokens = await prisma.refreshToken.createMany({
    data: [
      { hashedToken: 'hashedToken1', userId: 1, revoked: false },
      { hashedToken: 'hashedToken2', userId: 2, revoked: false },
      { hashedToken: 'hashedToken3', userId: 3, revoked: false },
      { hashedToken: 'hashedToken4', userId: 4, revoked: false },
      { hashedToken: 'hashedToken5', userId: 5, revoked: false },
    ],
  }); */
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
