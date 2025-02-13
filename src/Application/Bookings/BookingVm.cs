namespace CarRental.Application.Bookings;

public record BookingVm(int Id, int CarId, DateTime From, DateTime To, bool IsCanceled, decimal TotalPrice);