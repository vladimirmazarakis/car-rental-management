using CarRental.Domain.Entities;

namespace CarRental.Application.Common.Interfaces;

public interface IApplicationDbContext
{
    Task<int> SaveChangesAsync(CancellationToken cancellationToken);

    public DbSet<Car> Cars { get; }
}
