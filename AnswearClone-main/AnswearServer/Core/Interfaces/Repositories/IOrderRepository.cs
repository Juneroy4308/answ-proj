using Core.Entities.Filters;
using Core.Entities.Orders;

namespace Core.Interfaces.Repositories;

public interface IOrderRepository
{
    Task<OrderEntity> GetByIdAsync(int id);
    Task<IEnumerable<OrderEntity>> GetAllAsync();
    Task AddAsync(OrderEntity order);
    Task UpdateAsync(OrderEntity order);
    Task DeleteAsync(int id);
}
