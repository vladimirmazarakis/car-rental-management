
using System.Text.Json;
using CarRental.Application.Cars.Commands.CreateCar;
using CarRental.Application.Cars.Commands.DeleteCar;
using CarRental.Application.Cars.Commands.UpdateCar;
using CarRental.Application.Cars.Queries;
using CarRental.Application.Cars.Queries.GetCar;
using CarRental.Application.Cars.Queries.GetCars;
using CarRental.Domain.Entities;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace CarRental.Web.Endpoints;

public class Cars : EndpointGroupBase
{
    public override void Map(WebApplication app)
    {
        app.MapGroup(this)
            .RequireAuthorization()
            .MapGet(GetCar, "{id}")
            .MapGet(GetCars)
            .MapPost(CreateCar)
            .MapDelete(DeleteCar, "{id}")
            .MapPut(UpdateCar, "");
    }

    #region Queries 
    public async Task<Results<Ok<CarVm>, NotFound>> GetCar(ISender sender, int id)
    {
        GetCarQuery getCarQuery = new GetCarQuery(){ Id = id };

        try{
            var result = await sender.Send(getCarQuery);
            return TypedResults.Ok(result);
        }catch{
            return TypedResults.NotFound();
        }
    }

    public async Task<Ok<IList<CarVm>>> GetCars(ISender sender)
    {
        GetCarsQuery getCarsQuery = new GetCarsQuery();
        var result = await sender.Send(getCarsQuery);

        if(result is null)
        {
            return TypedResults.Ok(new List<CarVm>() as IList<CarVm>);
        }

        return TypedResults.Ok(result);
    }
    #endregion

    #region Commands
    public async Task<Ok<CarVm>> CreateCar(ISender sender, [FromBody] CreateCarCommand createCarCommand)
    {
        var result = await sender.Send(createCarCommand);
        return TypedResults.Ok(result);
    }

    public async Task<Ok<CarVm>> UpdateCar(ISender sender, [FromBody] UpdateCarCommand updateCarCommand)
    {
        var result = await sender.Send(updateCarCommand);

        return TypedResults.Ok(result);
    }

    public async Task<Results<Ok, BadRequest>> DeleteCar(ISender sender, int id)
    {
        DeleteCarCommand deleteCarCommand = new DeleteCarCommand() { Id = id };

        var result = await sender.Send(deleteCarCommand);

        if(!result)
        {
            return TypedResults.BadRequest();
        }

        return TypedResults.Ok();
    }
    #endregion
    

}