using Application.Services.IdentityServices;
using Application.Services.IdentityServices.Interfaces;
using AutoMapper;
using Core.Entities.Orders;
using Core.Interfaces.Repositories;
using Core.Interfaces.Services;
using Core.ViewModels.Basket;
using Core.ViewModels.Filter;
using Core.ViewModels.Order;
using Core.ViewModels.User;
using Infrastructure.Data;
using Infrastructure.Data.Repositories;

namespace Application.Services.ControllerServices;

public class OrderService(
    AppDbContext context,
    IScopedIdentityService identityService,
    IOrderRepository repository,
    IBasketRepository basketRepository,
    IMapper mapper
    ) : IOrderService

{
    public async Task AddOrderAsync(OrderCreateVm orderVm)
    {
        var orderStatusId = context.OrderStatuses.First().Id;

        var basketItems = await basketRepository.GetBasketItemsByUserIdAsync(orderVm.UserId);
        var orderItems = new List<OrderItemsEntity>();

        foreach (var item in basketItems)
        {
            var orderItem = new OrderItemsEntity
            {
                Count = item.Count,
                ProductVariationId = item.ProductVariationId,
                Price = 0
            };
            orderItems.Add(orderItem);
        }

        var orderEntity = new OrderEntity
        {
            UserId = orderVm.UserId,
            OrderStatusId = orderStatusId,
            OrderContactInfo = new OrderContactInfoEntity
            {
                FirstName = orderVm.OrderContactInfo.FirstName,
                LastName = orderVm.OrderContactInfo.LastName,
                Phone = orderVm.OrderContactInfo.Phone,
                Email = orderVm.OrderContactInfo.Email,
                City = orderVm.OrderContactInfo.City,
                Address = orderVm.OrderContactInfo.Address
            },
            OrderItems = orderItems
        };

        await repository.AddAsync(orderEntity);
    }


    public async Task DeleteOrderAsync(int id)
    {
        await repository.DeleteAsync(id);
    }

    public async Task<IEnumerable<OrderVm>> GetAllOrderAsync()
    {
        var entities = await repository.GetAllAsync();


        return mapper.Map<List<OrderVm>>(entities);
    }

    public async Task<IEnumerable<OrderVm>> GetOrdersByUserAsync()
    {
        var userId = identityService.GetRequiredUser().Id;
        var entities = await repository.GetAllAsync();
        entities = entities.Where(x => x.UserId == userId);

        return mapper.Map<List<OrderVm>>(entities);
    }

    public async Task<OrderVm> GetOrderByIdAsync(int id)
    {
        var entity = await repository.GetByIdAsync(id);

        return mapper.Map<OrderVm>(entity);
    }

    public async Task UpdateOrderAsync(OrderUpdateVm orderVm)
    {
        var order = await repository.GetByIdAsync(orderVm.Id);

        if (order == null)
        {
            throw new KeyNotFoundException($"Order with ID {orderVm.Id} not found.");
        }

        order.OrderStatusId = orderVm.OrderStatusId;

        await repository.UpdateAsync(order);
    }
}
