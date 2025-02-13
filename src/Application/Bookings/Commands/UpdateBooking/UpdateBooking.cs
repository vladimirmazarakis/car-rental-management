using System.Diagnostics.CodeAnalysis;
using CarRental.Application.Common.Interfaces;
using CarRental.Application.Common.Security;
using CarRental.Domain.Entities.Booking;
using CarRental.Domain.Exceptions.Booking;

namespace CarRental.Application.Bookings.Commands.UpdateBooking;

[Authorize]
public record UpdateBookingCommand : IRequest<BookingVm>
{
    public int Id { get; set; }
    public DateTime From { get; set; }
    public DateTime To { get; set; }
}

public class UpdateBookingCommandValidator : AbstractValidator<UpdateBookingCommand>
{
    public UpdateBookingCommandValidator()
    {
    }
}

public class UpdateBookingCommandHandler : IRequestHandler<UpdateBookingCommand, BookingVm>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public UpdateBookingCommandHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<BookingVm> Handle(UpdateBookingCommand request, CancellationToken cancellationToken)
    {
        var booking = await _context.Bookings.FirstAsync(b => b.Id == request.Id, cancellationToken);

        if(booking is null)
        {
            throw new BookingNotFoundException();
        }

        var updateBooking = new Booking();
        updateBooking.From = request.From;
        updateBooking.To = request.To;

        if(booking.IsDoubleBooking(updateBooking))
        {
            throw new DoubleBookingException();
        }

        booking.From = updateBooking.From;
        booking.To = updateBooking.To;

        await _context.SaveChangesAsync(cancellationToken);

        return _mapper.Map<BookingVm>(booking);
    }
}
