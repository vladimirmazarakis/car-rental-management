
using CarRental.Application.Bookings;
using CarRental.Application.Bookings.Commands.CancelBooking;
using CarRental.Application.Bookings.Commands.CreateBooking;
using CarRental.Application.Bookings.Commands.UpdateBooking;
using CarRental.Application.Bookings.Queries.GetAllBookingsForCar;
using CarRental.Application.Bookings.Queries.GetAvailableBookingDays;
using CarRental.Application.Bookings.Queries.GetBooking;
using CarRental.Domain.Exceptions.Booking;
using CarRental.Domain.Exceptions.Car;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace CarRental.Web.Endpoints;

public class Bookings : EndpointGroupBase
{
    public override void Map(WebApplication app)
    {
        app
        .MapGroup(this)
        .RequireAuthorization()
        .MapPost(CreateBooking)
        .MapPut(UpdateBooking, "")
        .MapDelete(CancelBooking, "{id}")
        .MapGet(GetAvailableBookingDays)
        .MapGet(GetAllBookingsForCar, "/ByCar/{carId}")
        .MapGet(GetBooking, "{id}");
    }

    public async Task<Results<Ok<BookingVm>, NotFound, BadRequest>> CreateBooking(ISender sender, [FromBody] CreateBookingCommand createBookingCommand)
    {
        try
        {
            var booking = await sender.Send(createBookingCommand);
            return TypedResults.Ok(booking);
        }
        catch(CarNotFoundException)
        {
            return TypedResults.NotFound();
        }
        catch(DoubleBookingException)
        {
            return TypedResults.BadRequest();
        }
    }

    public async Task<Results<Ok<BookingVm>, NotFound, BadRequest>> UpdateBooking(ISender sender, [FromBody] UpdateBookingCommand updateBookingCommand)
    {
        try
        {
            var result = await sender.Send(updateBookingCommand);
            return TypedResults.Ok(result);
        }
        catch(BookingNotFoundException)
        {
            return TypedResults.NotFound();
        }
        catch(DoubleBookingException)
        {
            return TypedResults.BadRequest();
        }
    }

    public async Task<Results<Ok, NotFound, BadRequest>> CancelBooking(ISender sender, int id)
    {
        CancelBookingCommand cancelBookingCommand = new CancelBookingCommand()
        {
            Id = id
        };
        try
        {
            await sender.Send(cancelBookingCommand);
            return TypedResults.Ok();
        }
        catch(BookingNotFoundException)
        {
            return TypedResults.NotFound();
        }
        catch(BookingAlreadyCanceledException)
        {
            return TypedResults.BadRequest();
        }
    }

    public async Task<Ok<IList<BookingVm>>> GetAllBookingsForCar(ISender sender, int carId)
    {
        var query = new GetAllBookingsForCarQuery();
        query.CarId = carId;

        var result = await sender.Send(query);
        return TypedResults.Ok(result);
    }

    public async Task<Results<Ok<IList<int>>, NotFound>> GetAvailableBookingDays(ISender sender, [FromQuery] int carId = -1, [FromQuery] int year = 1, [FromQuery] int month = 1)
    {
        var query = new GetAvailableBookingDaysQuery()
        {
            CarId = carId,
            Year = year,
            Month = month
        };
        try
        {
            IList<int> availableDays = await sender.Send(query);
            return TypedResults.Ok(availableDays);
        }
        catch(CarNotFoundException)
        {
            return TypedResults.NotFound();
        }
    }

    public async Task<Results<Ok<BookingVm>, NotFound>> GetBooking(ISender sender, int id)
    {
        var query = new GetBookingQuery()
        {
            Id = id
        };
        try
        {
            var result = await sender.Send(query);
            return TypedResults.Ok(result);
        }
        catch(BookingNotFoundException)
        {
            return TypedResults.NotFound();
        }
    }
}