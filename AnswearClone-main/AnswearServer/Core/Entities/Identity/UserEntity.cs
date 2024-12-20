using Core.Entities.Orders;
using Microsoft.AspNetCore.Identity;

namespace Core.Entities.Identity;

public class UserEntity : IdentityUser<int>
{
    public string? FirstName { get; set; }

    public string? LastName { get; set; }

    public virtual ICollection<UserRoleEntity> UserRoles { get; set; } = null!;
    public virtual ICollection<BasketEntity> BasketsProducts { get; set; } = null!;
    public virtual ICollection<OrderEntity> Orders { get; set; } = null!;

}