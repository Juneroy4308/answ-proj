using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entities.Orders;

[Table("tbl_OrderStatus")]
public class OrderStatusEntity
{
    public int Id { get; set; }

    [Required, StringLength(255)]
    public string Name { get; set; } = null!;
}
