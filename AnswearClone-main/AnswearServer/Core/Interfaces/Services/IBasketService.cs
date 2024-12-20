using Core.ViewModels.Basket;

namespace Core.Interfaces.Services;
public interface IBasketService
{
    Task AddToBasketAsync(BasketItemVm basketItem);
    Task RemoveFromBasketAsync(int productVariationId);
    Task<IEnumerable<BasketItemVm>> GetBasketItemsAsync();
    Task DecrementItemQuantityAsync(int productVariationId);
    Task ClearBasketAsync();
}