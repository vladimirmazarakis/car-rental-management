using CarRental.Application.Cars.Queries;
using CarRental.Domain.Entities;

namespace CarRental.Application.Common.Mappings;

public class CarMappingProfile : Profile
{
    public CarMappingProfile()
    {
        CreateMap<Car, CarVm>();
    }
}