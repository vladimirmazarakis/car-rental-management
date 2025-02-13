using System.Runtime.Serialization;

namespace CarRental.Domain.Exceptions.Booking;

public class DoubleBookingException : Exception
{
    public DoubleBookingException()
    {
    }

    public DoubleBookingException(string? message) : base(message)
    {
    }

    public DoubleBookingException(string? message, Exception? innerException) : base(message, innerException)
    {
    }
}