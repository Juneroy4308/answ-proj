using Application.Services.ControllerServices;
using Application.Services.IdentityServices.Interfaces;
using Core.Interfaces.Services;
using Core.ViewModels.Order;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace WebApi.Controllers;

[Route("api/[controller]/[action]")]
[ApiController]
public class OrderController(
    AppDbContext context,
    IScopedIdentityService identityService,
    IOrderService service
) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var orders = await service.GetAllOrderAsync();
        return Ok(orders);
    }

    [HttpGet]
    [Authorize]
    public async Task<IActionResult> GetUserOrders()
    {
        await identityService.InitCurrentUserAsync(this);


        var orders = await service.GetOrdersByUserAsync();
        return Ok(orders);
    }

    [HttpGet]
    public async Task<IActionResult> GetOrderStatuses()
    {
        var statuses = await context.OrderStatuses.ToListAsync();

        return Ok(statuses);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var order = await service.GetOrderByIdAsync(id);

        if (order == null)
        {
            return NotFound();
        }
        return Ok(order);
    }

    [HttpPost]
    public async Task<IActionResult> AddOrder([FromBody] OrderCreateVm orderVm)
    {
        await service.AddOrderAsync(orderVm);
        return Ok(new { message = "Order created successfully." });
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await service.DeleteOrderAsync(id);
        return Ok();
    }

    [HttpPatch("{id}")]
    public async Task<IActionResult> UpdateOrderStatus(int id, [FromBody] OrderUpdateVm orderVm)
    {
        try
        {
            await service.UpdateOrderAsync(orderVm);
            return Ok(new { message = "Order status updated successfully." });
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { message = ex.Message });
        }
    }
}
