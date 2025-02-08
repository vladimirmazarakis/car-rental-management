using CarRental.Application.Cars.Queries;
using CarRental.Domain.Entities.Car;

namespace CarRental.Application.Common.Mappings.Cars;

public class CarMappingProfile : Profile
{
    public CarMappingProfile()
    {
        CreateMap<Car, CarVm>();
    }
}