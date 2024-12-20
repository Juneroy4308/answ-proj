using Application.Services.IdentityServices.Interfaces;
using Core.Interfaces.Services;
using Core.ViewModels.Product;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace WebApi.Controllers;

[Route("api/[controller]/[action]")]
[ApiController]
public class ProductController(
    IScopedIdentityService identityService,
    IProductService service,
    IPaginationService<ProductVm, ProductFilterVm> pagination
 ) : ControllerBase
{
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var product = await service.GetProductByIdAsync(id);

        if (product == null)
        {
            return NotFound();
        }
        return Ok(product);
    }

    [HttpGet("{slug}")]
    public async Task<IActionResult> GetBySlug(string slug)
    {
        var product = await service.GetProductBySlugAsync(slug);

        if (product == null)
        {
            return NotFound();
        }
        return Ok(product);
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var products = await service.GetAllProductsAsync();
        return Ok(products);
    }

    [HttpGet]
    [Authorize(Roles = "Admin,User")]
    public async Task<IActionResult> GetFavoritProducts()
    {
        await identityService.InitCurrentUserAsync(this);

        var products = await service.GetFavoriteProductsAsync();
        return Ok(products);
    }

    [HttpPost("{id}")]
    [Authorize(Roles = "Admin,User")]
    public async Task<IActionResult> SetFavoritProduct(int id)
    {
        await identityService.InitCurrentUserAsync(this);

        await service.SetFavoriteProductsAsync(id);

        return Ok();
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin,User")]
    public async Task<IActionResult> RemoveFavoritProduct(int id)
    {
        await identityService.InitCurrentUserAsync(this);

        await service.RemoveFavoriteProductAsync(id);

        return Ok();
    }

    [HttpGet]
    public async Task<IActionResult> GetPage([FromQuery] ProductFilterVm vm)
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

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await service.DeleteProductAsync(id);
        return Ok();
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromForm] ProductCreateVm createVm)
    {
        await service.AddProductAsync(createVm);

        return Ok();
    }

    [HttpPut()]
    public async Task<IActionResult> Update([FromForm] ProductUpdateVm updateVm)
    {
        await service.UpdateProductAsync(updateVm);

        return Ok();
    }

    [HttpGet("{id}/similar")]
    public async Task<IActionResult> GetSimilarProducts(int id, int count = 4)
    {
        var similarProducts = await service.GetSimilarProductsAsync(id, count);

        return Ok(similarProducts);
    }

}
