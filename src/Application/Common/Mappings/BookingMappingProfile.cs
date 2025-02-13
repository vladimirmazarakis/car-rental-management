using CarRental.Application.Bookings;
using CarRental.Domain.Entities.Booking;

namespace CarRental.Application.Common.Mappings;

public class BookingMappingProfile : Profile
{
    public BookingMappingProfile()
    {
        CreateMap<Booking, BookingVm>();
    }
}