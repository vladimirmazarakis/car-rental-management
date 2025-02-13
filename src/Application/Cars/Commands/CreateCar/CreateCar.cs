using CarRental.Application.Cars.Queries;
using CarRental.Application.Common.Interfaces;
using CarRental.Application.Common.Security;
using CarRental.Domain.Entities.Car;

namespace CarRental.Application.Cars.Commands.CreateCar;

[Authorize]
public record CreateCarCommand : IRequest<CarVm>
{
    public string? Make { get; set; }
    public string? Model { get; set; }
    public int Year { get; set; }
    public int MileageInKm { get; set; }
    public decimal PricePerDay { get; set; }
}

public class CreateCarCommandValidator : AbstractValidator<CreateCarCommand>
{
    public CreateCarCommandValidator()
    {
    }
}

public class CreateCarCommandHandler : IRequestHandler<CreateCarCommand, CarVm>
{
    private readonly IApplicationDbContext _context;
    private readonly IUser _user;

    public CreateCarCommandHandler(IApplicationDbContext context, IUser user)
    {
        _context = context;
        _user = user;
    }

    public async Task<CarVm> Handle(CreateCarCommand request, CancellationToken cancellationToken)
    {
        var newCar = new Car()
        {
            Make = request.Make,
            Model = request.Model,
            Year = request.Year,
            MileageInKm = request.MileageInKm,
            PricePerDay = request.PricePerDay
        };

        await _context.Cars.AddAsync(newCar);

        await _context.SaveChangesAsync(cancellationToken);

        var carVm = new CarVm(newCar.Id, newCar.Make, newCar.Model, newCar.Year, newCar.MileageInKm, newCar.PricePerDay);           

        return carVm;
    }
}
