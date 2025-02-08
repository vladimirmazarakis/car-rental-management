using CarRental.Application.Common.Interfaces;
using CarRental.Application.Common.Security;

namespace CarRental.Application.Cars.Commands.DeleteCar;

[Authorize]
public record DeleteCarCommand : IRequest<bool>
{
    public int Id { get; set; }
}

public class DeleteCarCommandValidator : AbstractValidator<DeleteCarCommand>
{
    public DeleteCarCommandValidator()
    {
        
    }
}

public class DeleteCarCommandHandler : IRequestHandler<DeleteCarCommand, bool>
{
    private readonly IApplicationDbContext _context;
    private readonly IUser _user;

    public DeleteCarCommandHandler(IApplicationDbContext context, IUser user)
    {
        _context = context;
        _user = user;
    }

    public async Task<bool> Handle(DeleteCarCommand request, CancellationToken cancellationToken)
    {
        var car = await _context.Cars.FirstAsync(c => c.Id == request.Id);

        if(car is null)
        {
            return false;
        }

        _context.Cars.Remove(car);

        await _context.SaveChangesAsync(cancellationToken);
        
        return true;
    }
}
