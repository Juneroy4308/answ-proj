using Core.ViewModels.Filter;
using Core.ViewModels.Product;
namespace Core.Interfaces.Services;

public interface IProductService
{
    Task<ProductVm> GetProductByIdAsync(int id);
    Task<ProductVm> GetProductBySlugAsync(string slug);
    Task<IEnumerable<ProductVm>> GetAllProductsAsync();
    Task<IEnumerable<ProductVm>> GetFavoriteProductsAsync();
    Task SetFavoriteProductsAsync(int id);
    Task RemoveFavoriteProductAsync(int id);
    Task AddProductAsync(ProductCreateVm product);
    Task UpdateProductAsync(ProductUpdateVm updatedProduct);
    Task DeleteProductAsync(int id);
    Task<IEnumerable<ProductVm>> GetSimilarProductsAsync(int productId, int maxCount);
}
