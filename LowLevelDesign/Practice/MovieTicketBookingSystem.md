"
Users can browse movies, select a showtime, and reserve specific seats in a cinema hall. Once a seat is selected, it is temporarily locked for 5 minutes to allow the user to make a payment. If payment fails or times out, the seat becomes available again.
"

# Requirements
System capabilities
1. Let user browse movies, select showtime and book multiple seats.
2. after seat selection, Move to payment. Lock the seat for 5 min. User has 5 min to complete the payment.
3. Booking confirmation issued.

Error
1. payment fails/Timeout the seat is avaiable again after 5 min is elapsed.
2. No seats available.
3. Concurrency Collison.
Scope
1. UI


# Entities
- User
- Movies
- showtime
- Seat
- CinamaHall
- Payment
- Booking

BookingStatus
{
    STARTED
    SEAT_SELECTED
    PAYMENT_STARTED
    PAYMENT_DONE
    PAYMENT_FAILED
    BOOKING_CONFIRMED
}

class Movie
{
    name: string;
    startTime: Date;
    endTime: Date;
}

class Hall
{
    id: string;
    movies: Movie;
}

class CinemaHall
{
    halls: Hall;
}

class Booking
{
    status: BookingStatus;
    id: string;
    movie: Movie;
}

class User
{
    name: string;
}

class BrowseMovieCatalogService
{
    constructor(bookingService: BookingService)
    getMovies(): Movie[];
    selectAMovie(user: User): Movie;
}

class SeatSelectionService
{
    constructor(paymentService: PaymentService)
    selectSeats(user: User);
    lockSeats(seats: Seat[]);
    unlockSeats(seats: Seat[]);
}

class BookingService
{
    cinemaHall: CinemaHall;

    constructor(seatSeletionService: SeatSelectionService);

    bookAMovie(user: User, movie: Movie);
}

// browse movie catalog
// select a movie
// book a movie
// start payment
// if payment success booking successful