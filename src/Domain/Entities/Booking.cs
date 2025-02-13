namespace CarRental.Domain.Entities.Booking;

public class Booking : BaseAuditableEntity
{
    public int CarId { get; set; }
    public Car Car { get; set; } = default!;
    public DateTime From { get; set; }
    public DateTime To { get; set; }
    public bool IsCanceled { get; set; } = false;
    public decimal TotalPrice { get; set; }
}