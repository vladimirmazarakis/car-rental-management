using CarRental.Application.Cars.Queries;
using CarRental.Application.Common.Interfaces;
using CarRental.Application.Common.Security;
using CarRental.Domain.Entities.Car;

namespace CarRental.Application.Cars.Commands.UpdateCar;

[Authorize]
public record UpdateCarCommand : IRequest<CarVm>
{
    public int Id { get; set; }
    public string? Make { get; set; }
    public string? Model { get; set; }
    public int Year { get; set; }
    public int MileageInKm { get; set; }
    public decimal PricePerDay { get; set; }
}

public class UpdateCarCommandValidator : AbstractValidator<UpdateCarCommand>
{
    public UpdateCarCommandValidator()
    {
    }
}

public class UpdateCarCommandHandler : IRequestHandler<UpdateCarCommand, CarVm>
{
    private readonly IApplicationDbContext _context;
    private readonly IUser _user;

    public UpdateCarCommandHandler(IApplicationDbContext context, IUser user)
    {
        _context = context;
        _user = user;
    }

    public async Task<CarVm> Handle(UpdateCarCommand request, CancellationToken cancellationToken)
    {
        var car = await _context.Cars.FirstAsync(c => c.Id == request.Id);

        car.Make = request.Make;
        car.Model = request.Model;
        car.MileageInKm = request.MileageInKm;
        car.Year = request.Year;
        car.PricePerDay = request.PricePerDay;


        await _context.SaveChangesAsync(cancellationToken);

        var carVm = new CarVm(car.Id, car.Make, car.Model, car.Year, car.MileageInKm, car.PricePerDay);

        return carVm;
    }
}
