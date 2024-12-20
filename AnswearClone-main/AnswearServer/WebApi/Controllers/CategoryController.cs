using Core.Interfaces.Services;
using Core.ViewModels.Category;
using Core.ViewModels.Discount;
using Core.ViewModels.Pagination;
using Core.ViewModels.TargetGroup;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers;

[Route("api/[controller]/[action]")]
[ApiController]
public class CategoryController(
    ICategoryService service,
    IPaginationService<CategoryVm, CategoryFilterVm> pagination
) : ControllerBase
{
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var category = await service.GetCategoryByIdAsync(id);

        if (category == null)
        {
            return NotFound();
        }
        return Ok(category);
    }

    [HttpGet("{slug}")]
    public async Task<IActionResult> GetBySlug(string slug)
    {
        var category = await service.GetCategoryBySlugAsync(slug);

        if (category == null)
        {
            return NotFound();
        }
        return Ok(category);
    }


    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var category = await service.GetAllCategoriesAsync();
        return Ok(category);
    }

    [HttpGet]
    public async Task<IActionResult> GetPage([FromQuery] CategoryFilterVm vm)
    {
        try
        {
            return Ok(await pagination.GetPageAsync(vm));
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CategoryCreateVm createVm)
    {
        await service.AddCategoryAsync(createVm);

        return Ok();
    }

    [HttpPut()]
    public async Task<IActionResult> Update([FromBody] CategoryUpdateVm createVm)
    {
        await service.UpdateCategoryAsync(createVm);

        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await service.DeleteCategoryAsync(id);
        return Ok();
    }
}
