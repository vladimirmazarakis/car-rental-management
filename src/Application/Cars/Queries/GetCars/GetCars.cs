using CarRental.Application.Common.Interfaces;
using CarRental.Application.Common.Security;
using CarRental.Domain.Entities;

namespace CarRental.Application.Cars.Queries.GetCars;

[Authorize]
public record GetCarsQuery : IRequest<IList<CarVm>>
{
}

public class GetCarsQueryValidator : AbstractValidator<GetCarsQuery>
{
    public GetCarsQueryValidator()
    {
    }
}

public class GetCarsQueryHandler : IRequestHandler<GetCarsQuery, IList<CarVm>>
{
    private readonly IApplicationDbContext _context;
    private readonly IUser _user;
    private readonly IMapper _mapper;

    public GetCarsQueryHandler(IApplicationDbContext context, IUser user, IMapper mapper)
    {
        _context = context;
        _user = user;
        _mapper = mapper;
    }

    public async Task<IList<CarVm>> Handle(GetCarsQuery request, CancellationToken cancellationToken)
    {
        return await _context.Cars.AsNoTracking().ProjectTo<CarVm>(_mapper.ConfigurationProvider).ToListAsync(cancellationToken);
    }
}
