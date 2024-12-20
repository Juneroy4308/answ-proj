using Application.Services.IdentityServices.Interfaces;
using Core.Interfaces.Services;
using Core.ViewModels.Basket;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers;

[ApiController]
[Route("api/[controller]/[action]")]
[Authorize]
public class BasketController(
    IScopedIdentityService identityService,
    IBasketService service
    ) : ControllerBase
{


    [HttpPost]
    public async Task<IActionResult> AddToBasket([FromBody] BasketItemVm basketItem)
    {
        await identityService.InitCurrentUserAsync(this);

        await service.AddToBasketAsync(basketItem);
        return Ok();
    }

    [HttpDelete("{productVariationId}")]
    public async Task<IActionResult> RemoveFromBasket(int productVariationId)
    {
        await identityService.InitCurrentUserAsync(this);

        await service.RemoveFromBasketAsync(productVariationId);
        return Ok();
    }

    [HttpPatch("{productVariationId}")]
    public async Task<IActionResult> DecrementItemQuantity(int productVariationId)
    {
        await identityService.InitCurrentUserAsync(this);

        await service.DecrementItemQuantityAsync(productVariationId);
        return Ok();
    }


    [HttpGet]
    public async Task<IActionResult> GetBasketItems()
    {
        await identityService.InitCurrentUserAsync(this);

        var items = await service.GetBasketItemsAsync();
        return Ok(items);
    }

    [HttpDelete]
    public async Task<IActionResult> ClearBasket()
    {
        await identityService.InitCurrentUserAsync(this);

        await service.ClearBasketAsync();
        return Ok();
    }
}
