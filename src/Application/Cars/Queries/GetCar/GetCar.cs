using CarRental.Application.Common.Interfaces;
using CarRental.Application.Common.Security;
using CarRental.Domain.Entities.Car;

namespace CarRental.Application.Cars.Queries.GetCar;

[Authorize]
public record GetCarQuery : IRequest<CarVm>
{
    public int Id { get; set; }
}

public class GetCarQueryValidator : AbstractValidator<GetCarQuery>
{
    public GetCarQueryValidator()
    {
    }
}

public class GetCarQueryHandler : IRequestHandler<GetCarQuery, CarVm>
{
    private readonly IApplicationDbContext _context;
    private readonly IUser _user;
    private readonly IMapper _mapper;

    public GetCarQueryHandler(IApplicationDbContext context, IUser user, IMapper mapper)
    {
        _context = context;
        _user = user;
        _mapper = mapper;
    }

    public async Task<CarVm> Handle(GetCarQuery request, CancellationToken cancellationToken)
    {
        return await _context.Cars.AsNoTracking().ProjectTo<CarVm>(_mapper.ConfigurationProvider).FirstAsync(c => c.Id == request.Id);
    }
}
