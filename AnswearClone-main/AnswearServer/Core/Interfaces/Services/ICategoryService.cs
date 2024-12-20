using Core.ViewModels.Category;

namespace Core.Interfaces.Services;

public interface ICategoryService
{
    Task<CategoryVm> GetCategoryByIdAsync(int id);
    Task<CategoryVm> GetCategoryBySlugAsync(string slug);
    Task<IEnumerable<CategoryVm>> GetAllCategoriesAsync();
    Task AddCategoryAsync(CategoryCreateVm category);
    Task UpdateCategoryAsync(CategoryUpdateVm category);
    Task DeleteCategoryAsync(int id);
}
