using Core.Entities.Orders;
using Core.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data.Repositories;

public class OrderRepository(
    AppDbContext context
) : IOrderRepository
{
    public async Task AddAsync(OrderEntity order)
    {
        await context.Orders.AddAsync(order);
        await context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var order = await context.Orders.FindAsync(id);
        if (order != null)
        {
            context.Orders.Remove(order);
            await context.SaveChangesAsync();
        }
    }

    public async Task<IEnumerable<OrderEntity>> GetAllAsync()
    {
        return await context.Orders
           .Include(or => or.User)
           .Include(or => or.OrderContactInfo)
           .Include(or => or.OrderStatus)
           .Include(or => or.OrderItems)
               .ThenInclude(oi => oi.ProductVariation)
           .ToListAsync();
    }

    public async Task<OrderEntity> GetByIdAsync(int id)
    {
        return await context.Orders
           .Include(or => or.User)
           .Include(or => or.OrderContactInfo)
           .Include(or => or.OrderStatus)
           .Include(or => or.OrderItems)
               .ThenInclude(oi => oi.ProductVariation)
           .FirstOrDefaultAsync(u => u.Id == id);
    }

    public async Task UpdateAsync(OrderEntity order)
    {
        context.Orders.Update(order);
        await context.SaveChangesAsync();
    }
}
