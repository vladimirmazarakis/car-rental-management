using CarRental.Application.Common.Interfaces;
using CarRental.Application.Common.Security;
using CarRental.Domain.Entities.Booking;
using CarRental.Domain.Exceptions.Booking;
using CarRental.Domain.Exceptions.Car;

namespace CarRental.Application.Bookings.Commands.CreateBooking;

[Authorize]
public record CreateBookingCommand : IRequest<BookingVm>
{
    public int CarId { get; set; }
    public DateTime From { get; set; }
    public DateTime To { get; set; }
    public bool IsCanceled { get; set; } = false;
}

public class CreateBookingCommandValidator : AbstractValidator<CreateBookingCommand>
{
    public CreateBookingCommandValidator()
    {
    }
}

public class CreateBookingCommandHandler : IRequestHandler<CreateBookingCommand, BookingVm>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public CreateBookingCommandHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<BookingVm> Handle(CreateBookingCommand request, CancellationToken cancellationToken)
    {
        var newBooking = new Booking()
        {
            CarId = request.CarId,
            From = request.From,
            To = request.To,
            IsCanceled = request.IsCanceled
        };

        var bookingsList = await _context.Bookings.ToListAsync();

        var isDoubleBooking = bookingsList.Any(bk => bk.IsDoubleBooking(newBooking));

        if(isDoubleBooking)
        {
            throw new DoubleBookingException();
        }

        var car = await _context.Cars.FindAsync(request.CarId);

        if(car is null)
        {
            throw new CarNotFoundException();
        }

        double totalDays = Math.Round((newBooking.To - newBooking.From).TotalDays);
        decimal totalPrice = car.PricePerDay * (decimal)totalDays;
        
        newBooking.TotalPrice = totalPrice;

        _context.Bookings.Add(newBooking);
        await _context.SaveChangesAsync(cancellationToken);

        return _mapper.Map<BookingVm>(newBooking);
    }
}
