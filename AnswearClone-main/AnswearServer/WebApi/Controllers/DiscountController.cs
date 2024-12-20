using Core.Interfaces.Services;
using Core.ViewModels.Discount;
using Core.ViewModels.Pagination;
using Core.ViewModels.TargetGroup;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers;

[Route("api/[controller]/[action]")]
[ApiController]
public class DiscountController(
    IDiscountService service,
    IPaginationService<DiscountVm, DiscountFilterVm> pagination
) : ControllerBase
{
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var discount = await service.GetDiscountByIdAsync(id);

        if (discount == null)
        {
            return NotFound();
        }
        return Ok(discount);
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var discounts = await service.GetAllDiscountAsync();
        return Ok(discounts);
    }

    [HttpGet]
    public async Task<IActionResult> GetPage([FromQuery] DiscountFilterVm vm)
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
    public async Task<IActionResult> Create([FromForm] DiscountCreateVm createVm)
    {
        await service.AddDiscountAsync(createVm);

        return Ok();
    }

    [HttpPut()]
    public async Task<IActionResult> Update([FromForm] DiscountUpdateVm updateVm)
    {
        await service.UpdateDiscountAsync(updateVm);

        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await service.DeleteDiscountAsync(id);
        return Ok();
    }


}
