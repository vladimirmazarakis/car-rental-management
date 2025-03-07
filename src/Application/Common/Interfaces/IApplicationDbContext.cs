﻿using CarRental.Domain.Entities;
using CarRental.Domain.Entities.Booking;

namespace CarRental.Application.Common.Interfaces;

public interface IApplicationDbContext
{
    Task<int> SaveChangesAsync(CancellationToken cancellationToken);

    public DbSet<Car> Cars { get; }
    public DbSet<Booking> Bookings { get; }
}
