using Core.Entities.Orders;
using Core.Entities;
using System.ComponentModel.DataAnnotations;

namespace Core.ViewModels.Order;

public class OrderVm
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public int OrderStatusId { get; set; }
    public OrderStatusVm OrderStatus { get; set; } = null!;
    public OrderContactInfoVm OrderContactInfo { get; set; } = null!;
    public List<OrderItemsVm> OrderItems { get; set; } = null!;
}

public class OrderUpdateVm
{
    public int Id { get; set; }
    public int OrderStatusId { get; set; }
}

public class OrderStatusVm
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
}

public class OrderContactInfoVm
{
    public int Id { get; set; }
    public string FirstName { get; set; } = null!;
    public string LastName { get; set; } = null!;
    public string Phone { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string City { get; set; } = null!;
    public string Address { get; set; } = null!;
}

public class OrderItemsVm
{
    public int ProductVariationId { get; set; }
    public ProductVariationEntity ProductVariation { get; set; } = null!;
    public int Count { get; set; }
    public decimal Price { get; set; }
}

public class OrderCreateVm
{
    public int UserId { get; set; }
    public OrderContactInfoCreateVm OrderContactInfo { get; set; } = null!;
    public List<OrderItemsCreateVm>? OrderItems { get; set; }
}

public class OrderContactInfoCreateVm
{
    public string FirstName { get; set; } = null!;
    public string LastName { get; set; } = null!;
    public string Phone { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string City { get; set; } = null!;
    public string Address { get; set; } = null!;
}

public class OrderItemsCreateVm
{
    public int ProductVariationId { get; set; }
    public int Count { get; set; }
}
