namespace CarRental.Domain.Entities.Car;

public class Car : BaseAuditableEntity
{
    public string? Make { get; set; }
    public string? Model { get; set; }
    public int Year { get; set; }
    public int MileageInKm { get; set; }
}