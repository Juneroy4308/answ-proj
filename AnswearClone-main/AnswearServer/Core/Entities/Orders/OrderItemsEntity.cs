using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entities.Orders;

[Table("tbl_OrderItems")]
public class OrderItemsEntity
{
    [Required]
    public int ProductVariationId { get; set; }
    public ProductVariationEntity ProductVariation { get; set; } = null!;

    [Required]
    public int OrderId { get; set; }
    public OrderEntity Order { get; set; } = null!;

    [Required, Range(0, int.MaxValue, ErrorMessage = "Count must be greater than or equal to 0.")]
    public int Count { get; set; }

    [Required, Range(0, double.MaxValue, ErrorMessage = "Price must be greater than or equal to 0.")]
    public decimal Price { get; set; }
}
