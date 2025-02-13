using CarRental.Application.Common.Interfaces;
using CarRental.Application.Common.Security;
using CarRental.Domain.Exceptions.Booking;

namespace CarRental.Application.Bookings.Queries.GetBooking;

[Authorize]
public record GetBookingQuery : IRequest<BookingVm>
{
    public int Id { get; set; }
}

public class GetBookingQueryValidator : AbstractValidator<GetBookingQuery>
{
    public GetBookingQueryValidator()
    {
    }
}

public class GetBookingQueryHandler : IRequestHandler<GetBookingQuery, BookingVm>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetBookingQueryHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<BookingVm> Handle(GetBookingQuery request, CancellationToken cancellationToken)
    {   
        try
        {
            return await _context.Bookings.ProjectTo<BookingVm>(_mapper.ConfigurationProvider).FirstAsync(b => b.Id == request.Id);
        }
        catch(Exception)
        {
            throw new BookingNotFoundException();
        }
    }
}
