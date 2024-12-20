using Core.Entities.Orders;

namespace Core.Interfaces.Repositories;

public interface IBasketRepository
{
    Task AddToBasketAsync(BasketEntity basketItem);
    Task RemoveFromBasketAsync(int userId, int productVariationId);
    Task<IEnumerable<BasketEntity>> GetBasketItemsByUserIdAsync(int userId);
    Task ClearBasketAsync(int userId);

    Task<BasketEntity?> GetBasketItemAsync(int userId, int productVariationId);
    Task UpdateBasketItemAsync(BasketEntity basketEntity);
}
