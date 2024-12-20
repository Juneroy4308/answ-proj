using Core.Entities.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entities;

[Table("tbl_FavoriteProducts")]

public class FavoriteProductEntity
{
    public int ProductId { get; set; }
    public ProductEntity Product { get; set; } = null!;

    public int UserId { get; set; }
    public UserEntity User { get; set; } = null!;
}
