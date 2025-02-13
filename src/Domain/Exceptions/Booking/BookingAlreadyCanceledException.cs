using System.Runtime.Serialization;

namespace CarRental.Domain.Exceptions.Booking;

public class BookingAlreadyCanceledException : Exception
{
    public BookingAlreadyCanceledException()
    {
    }

    public BookingAlreadyCanceledException(string? message) : base(message)
    {
    }

    public BookingAlreadyCanceledException(string? message, Exception? innerException) : base(message, innerException)
    {
    }
}