using CarRental.Application.Common.Interfaces;
using CarRental.Application.Common.Security;

namespace CarRental.Application.Bookings.Queries.GetAllBookingsForCar;

[Authorize]
public record GetAllBookingsForCarQuery : IRequest<IList<BookingVm>>
{
    public int CarId { get; set; }
}

public class GetAllBookingsForCarQueryValidator : AbstractValidator<GetAllBookingsForCarQuery>
{
    public GetAllBookingsForCarQueryValidator()
    {
    }
}

public class GetAllBookingsForCarQueryHandler : IRequestHandler<GetAllBookingsForCarQuery, IList<BookingVm>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetAllBookingsForCarQueryHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<IList<BookingVm>> Handle(GetAllBookingsForCarQuery request, CancellationToken cancellationToken)
    {
        var list = await _context.Bookings.Where(b => b.CarId == request.CarId).ProjectTo<BookingVm>(_mapper.ConfigurationProvider).ToListAsync();
        return list;
    }
}
