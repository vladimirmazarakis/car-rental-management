using CarRental.Application.Common.Interfaces;
using CarRental.Application.Common.Security;
using CarRental.Domain.Exceptions.Booking;

namespace CarRental.Application.Bookings.Commands.CancelBooking;

[Authorize]
public record CancelBookingCommand : IRequest
{
    public int Id { get; set; }
}

public class CancelBookingCommandValidator : AbstractValidator<CancelBookingCommand>
{
    public CancelBookingCommandValidator()
    {
    }
}

public class CancelBookingCommandHandler : IRequestHandler<CancelBookingCommand>
{
    private readonly IApplicationDbContext _context;

    public CancelBookingCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task Handle(CancelBookingCommand request, CancellationToken cancellationToken)
    {
        var booking = await _context.Bookings.FirstAsync(f => f.Id == request.Id, cancellationToken);

        if(booking is null)
        {
            throw new BookingNotFoundException();
        }

        if(booking.IsCanceled)
        {
            throw new BookingAlreadyCanceledException();
        }

        booking.IsCanceled = true;

        await _context.SaveChangesAsync(cancellationToken);
    }
}
