using System.Runtime.Serialization;

namespace CarRental.Domain.Exceptions.Car;

public class CarNotFoundException : Exception
{
    public CarNotFoundException()
    {
    }

    public CarNotFoundException(string? message) : base(message)
    {
    }

    public CarNotFoundException(string? message, Exception? innerException) : base(message, innerException)
    {
    }
}