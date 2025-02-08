namespace CarRental.Application.Cars.Queries;

public record CarVm(int Id, string? Make, string? Model, int Year, int MileageInKm);