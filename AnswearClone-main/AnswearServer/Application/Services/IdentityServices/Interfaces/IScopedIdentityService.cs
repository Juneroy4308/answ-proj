using Core.Entities.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Application.Services.IdentityServices.Interfaces;

public interface IScopedIdentityService
{
    UserEntity? User { get; }

    Task InitCurrentUserAsync(ControllerBase controller);

    UserEntity GetRequiredUser();

    long GetRequiredUserId();
}
