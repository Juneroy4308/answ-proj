using Core.Entities.Identity;
using Microsoft.AspNetCore.Mvc;
namespace Application.Services.IdentityServices.Interfaces;

public interface IIdentityService
{
    Task<UserEntity> GetCurrentUserAsync(ControllerBase controller);
}
