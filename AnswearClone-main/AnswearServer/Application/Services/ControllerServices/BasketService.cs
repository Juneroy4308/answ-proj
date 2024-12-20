using Application.Services.IdentityServices;
using Application.Services.IdentityServices.Interfaces;
using AutoMapper;
using Core.Entities.Orders;
using Core.Interfaces.Repositories;
using Core.Interfaces.Services;
using Core.ViewModels.Basket;
using Microsoft.EntityFrameworkCore;

namespace Application.Services.ControllerServices;

public class BasketService(
    IBasketRepository repository,
    IScopedIdentityService identityService,
    IMapper mapper
) : IBasketService
{
    public async Task AddToBasketAsync(BasketItemVm basketItem)
    {
        var userId = identityService.GetRequiredUser().Id;

        var basketEntity = new BasketEntity
        {
            UserId = userId,
            ProductVariationId = basketItem.ProductVariationId,
            Count = basketItem.Count,
            DateCreated = DateTime.UtcNow
        };

        await repository.AddToBasketAsync(basketEntity);
    }

    public async Task RemoveFromBasketAsync(int productVariationId)
    {
        var userId = identityService.GetRequiredUser().Id;

        await repository.RemoveFromBasketAsync(userId, productVariationId);
    }

    public async Task<IEnumerable<BasketItemVm>> GetBasketItemsAsync()
    {
        var userId = identityService.GetRequiredUser().Id;

        var basketItems = await repository.GetBasketItemsByUserIdAsync(userId);

        return mapper.Map<IEnumerable<BasketItemVm>>(basketItems);
    }

    public async Task ClearBasketAsync()
    {
        var userId = identityService.GetRequiredUser().Id;

        await repository.ClearBasketAsync(userId);
    }

    public async Task DecrementItemQuantityAsync(int productVariationId)
    {
        var userId = identityService.GetRequiredUser().Id;

        var basketItem = await repository.GetBasketItemAsync(userId, productVariationId);

        if (basketItem == null)
            throw new Exception("Item not found in basket.");

        if (basketItem.Count > 1)
        {
            basketItem.Count--;
            await repository.UpdateBasketItemAsync(basketItem);
        }
        else
        {
            await repository.RemoveFromBasketAsync(userId, productVariationId);
        }
    }


}