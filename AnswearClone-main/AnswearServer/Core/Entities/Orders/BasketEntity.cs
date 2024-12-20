using Core.Entities.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entities.Orders;

[Table("tbl_Basket")]
public class BasketEntity
{
    public int UserId { get; set; }
    public UserEntity User { get; set; } = null!;
    public int ProductVariationId { get; set; }
    public ProductVariationEntity ProductVariation { get; set; } = null!;
    public int Count { get; set; }
    public DateTime DateCreated { get; set; }
}
