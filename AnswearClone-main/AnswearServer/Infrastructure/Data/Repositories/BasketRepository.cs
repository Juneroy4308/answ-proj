using Core.Entities.Orders;
using Core.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data.Repositories;

public class BasketRepository(
    AppDbContext context
) : IBasketRepository
{
    public async Task AddToBasketAsync(BasketEntity basketItem)
    {
        var existingItem = await context.Baskets
            .FirstOrDefaultAsync(b => b.UserId == basketItem.UserId && b.ProductVariationId == basketItem.ProductVariationId);

        if (existingItem != null)
        {
            existingItem.Count += basketItem.Count;
        }
        else
        {
            await context.Baskets.AddAsync(basketItem);
        }

        await context.SaveChangesAsync();
    }

    public async Task RemoveFromBasketAsync(int userId, int productVariationId)
    {
        var basketItem = await context.Baskets
            .FirstOrDefaultAsync(b => b.UserId == userId && b.ProductVariationId == productVariationId);

        if (basketItem != null)
        {
            context.Baskets.Remove(basketItem);
            await context.SaveChangesAsync();
        }
    }

    //public async Task<IEnumerable<BasketEntity>> GetBasketItemsByUserIdAsync(int userId)
    //{
    //    return await context.Baskets
    //        .Include(b => b.ProductVariation)
    //            .ThenInclude(p => p.Photos)
    //            .Include(p => p.ProductVariation)
    //            .ThenInclude(p => p.Product)
    //        .Where(b => b.UserId == userId)
    //        .ToListAsync();
    //}

    public async Task<IEnumerable<BasketEntity>> GetBasketItemsByUserIdAsync(int userId)
    {
        return await context.Baskets
            .AsNoTracking()
            .Include(b => b.ProductVariation.Photos)
            .Include(b => b.ProductVariation.Product)
            .Where(b => b.UserId == userId)
            .ToListAsync();
    }


    public async Task ClearBasketAsync(int userId)
    {
        var basketItems = await context.Baskets
            .Where(b => b.UserId == userId)
            .ToListAsync();

        context.Baskets.RemoveRange(basketItems);
        await context.SaveChangesAsync();
    }

    public async Task<BasketEntity?> GetBasketItemAsync(int userId, int productVariationId)
    {
        return await context.Baskets
            .FirstOrDefaultAsync(b => b.UserId == userId && b.ProductVariationId == productVariationId);
    }

    public async Task UpdateBasketItemAsync(BasketEntity basketEntity)
    {
        context.Baskets.Update(basketEntity);
        await context.SaveChangesAsync();
    }
}