using System.Reflection;
using CarRental.Application.Common.Interfaces;
using CarRental.Domain.Entities;
using CarRental.Infrastructure.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace CarRental.Infrastructure.Data;

public class ApplicationDbContext : IdentityDbContext<ApplicationUser>, IApplicationDbContext
{
    private readonly IUser? _user;

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options, IUser? user = null) : base(options) 
    {
        _user = user;
    }

    public DbSet<Car> Cars => Set<Car>();

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

        if(_user is not null)
        {
            builder.Entity<Car>().HasQueryFilter(c => c.CreatedBy == _user.Id);
        }
    }
}
