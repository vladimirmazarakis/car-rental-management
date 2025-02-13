using CarRental.Application.Common.Interfaces;
using CarRental.Application.Common.Security;
using CarRental.Domain.Exceptions.Car;

namespace CarRental.Application.Bookings.Queries.GetAvailableBookingDays;

[Authorize]
public record GetAvailableBookingDaysQuery : IRequest<IList<int>>
{
    public int CarId { get; set; }
    public int Year { get; set; }
    public int Month { get; set; }
}

public class GetAvailableBookingDaysQueryValidator : AbstractValidator<GetAvailableBookingDaysQuery>
{
    public GetAvailableBookingDaysQueryValidator()
    {
    }
}

public class GetAvailableBookingDaysQueryHandler : IRequestHandler<GetAvailableBookingDaysQuery, IList<int>>
{
    private readonly IApplicationDbContext _context;

    public GetAvailableBookingDaysQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IList<int>> Handle(GetAvailableBookingDaysQuery request, CancellationToken cancellationToken)
    {
        int daysInMonth = DateTime.DaysInMonth(request.Year, request.Month);
        var startOfMonth = new DateTime(request.Year, request.Month, 1);
        var endOfMonth = new DateTime(request.Year, request.Month, daysInMonth);

        if(!_context.Cars.Any(c => c.Id == request.CarId))
        {
            throw new CarNotFoundException();
        }

        var bookingsList = await _context.Bookings
            .Where(b => b.CarId == request.CarId && b.From <= endOfMonth && b.To >= startOfMonth && b.IsCanceled == false)
            .Select(b => new { b.From, b.To })
            .ToListAsync();

        HashSet<int> unavailableDays = new HashSet<int>();

        foreach (var booking in bookingsList)
        {
            int startDay = booking.From.Month == request.Month ? booking.From.Day : 1;
            int endDay = booking.To.Month == request.Month ? booking.To.Day : daysInMonth;

            for (int i = startDay; i <= endDay; i++)
            {
                unavailableDays.Add(i);
            }
        }

        List<int> availableDays = Enumerable.Range(1, daysInMonth).Where(d => !unavailableDays.Contains(d)).ToList();

        return availableDays;
    }
}
