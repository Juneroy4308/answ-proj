using Core.ViewModels.Order;

namespace Core.Interfaces.Services;

public interface IOrderService
{
    Task<OrderVm> GetOrderByIdAsync(int id);
    Task<IEnumerable<OrderVm>> GetOrdersByUserAsync();
    Task<IEnumerable<OrderVm>> GetAllOrderAsync();
    Task AddOrderAsync(OrderCreateVm order);
    Task UpdateOrderAsync(OrderUpdateVm orderVm);
    Task DeleteOrderAsync(int id);
}
