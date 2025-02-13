namespace CarRental.Domain.Exceptions.Booking;

using System.Runtime.Serialization;

public class BookingNotFoundException : Exception
{
    public BookingNotFoundException()
    {
    }

    public BookingNotFoundException(string? message) : base(message)
    {
    }

    public BookingNotFoundException(string? message, Exception? innerException) : base(message, innerException)
    {
    }
}