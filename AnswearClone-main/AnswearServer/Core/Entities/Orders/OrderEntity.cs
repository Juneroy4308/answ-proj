using Core.Entities.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entities.Orders;

[Table("tbl_Orders")]
public class OrderEntity
{
    public int Id { get; set; }

    public int UserId { get; set; }
    public virtual UserEntity User { get; set; } = null!;

    public int OrderStatusId { get; set; }
    public virtual OrderStatusEntity OrderStatus { get; set; } = null!;

    public virtual ICollection<OrderItemsEntity> OrderItems { get; set; } = null!;
    public virtual OrderContactInfoEntity OrderContactInfo { get; set; } = null!;
}
