﻿using Application.Services;
using Core.Interfaces.Services;
using Core.SMTP;
using Core.ViewModels.Errors;
using Core.ViewModels.User;
using Google.Apis.Auth;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace WebApi.Controllers;

[Route("api/[controller]/[action]")]
[ApiController]
public class UserController(
    IUserService service
) : ControllerBase
{
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        try
        {
            var user = await service.GetUserByIdAsync(id);
            if (user == null)
            {
                return NotFound(new ErrorResponse { Message = "User not found", StatusCode = 404 });
            }
            return Ok(user);
        }
        catch (Exception e)
        {
            return StatusCode(500, new ErrorResponse { Message = e.Message, StatusCode = 500 });
        }
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        try
        {
            var users = await service.GetAllUsersAsync();
            return Ok(users);
        }
        catch (Exception e)
        {
            return StatusCode(500, new ErrorResponse { Message = e.Message, StatusCode = 500 });
        }
    }

    [HttpPost]
    public async Task<IActionResult> SignUp([FromBody] SignUpVm createVm)
    {
        try
        {
            var token = await service.AddUserAsync(createVm);
            return Ok(new { Token = token });
        }
        catch (Exception e)
        {
            return StatusCode(500, new ErrorResponse { Message = e.Message, StatusCode = 500 });
        }
    }

    [HttpPut()]
    public async Task<IActionResult> Update([FromBody] UserUpdateVm createVm)
    {
        try
        {
            await service.UpdateUserAsync(createVm);
            return Ok();
        }
        catch (Exception e)
        {
            return StatusCode(500, new ErrorResponse { Message = e.Message, StatusCode = 500 });
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        try
        {
            await service.DeleteUserAsync(id);
            return Ok();
        }
        catch (Exception e)
        {
            return StatusCode(500, new ErrorResponse { Message = e.Message, StatusCode = 500 });
        }
    }

    [HttpPost]
    public async Task<IActionResult> SignIn([FromBody] SignInVm model)
    {
        try
        {
            var token = await service.SignInAsync(model);
            return Ok(new { Token = token });
        }
        catch (UnauthorizedAccessException e)
        {
            return Unauthorized(new ErrorResponse { Message = e.Message, StatusCode = 401 });
        }
        catch (Exception e)
        {
            return StatusCode(500, new ErrorResponse { Message = e.Message, StatusCode = 500 });
        }
    }

    [HttpPost]
    public async Task<IActionResult> GoogleSignIn([FromForm] GoogleSignInVm model)
    {
        try
        {
            var token = await service.GoogleSignInAsync(model);
            return Ok(new { Token = token });
        }
        catch (InvalidJwtException e)
        {
            return Unauthorized(new ErrorResponse { Message = e.Message, StatusCode = 401 });
        }
        catch (Exception e)
        {
            return StatusCode(500, new ErrorResponse { Message = e.Message, StatusCode = 500 });
        }
    }

    [HttpPost("{id}")]
    public async Task<IActionResult> BlockUser(int id)
    {
        try
        {
            await service.BlockUserAsync(id, TimeSpan.FromDays(10));
            return Ok();
        }
        catch (Exception e)
        {
            return StatusCode(500, new ErrorResponse { Message = e.Message, StatusCode = 500 });
        }
    }

    [HttpPost("{id}")]
    public async Task<IActionResult> UnlockUser(int id)
    {
        try
        {
            await service.UnlockUserAsync(id);
            return Ok();
        }
        catch (Exception e)
        {
            return StatusCode(500, new ErrorResponse { Message = e.Message, StatusCode = 500 });
        }
    }

    [HttpPost]
    public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordVm model)
    {
        try
        {
            await service.GeneratePasswordResetTokenAsync(model.Email);
            return Ok();
        }
        catch (Exception e)
        {
            return StatusCode(500, new ErrorResponse { Message = e.Message, StatusCode = 500 });
        }
    }

    [HttpPost]
    public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordVm model)
    {
        try
        {
            await service.ResetPasswordAsync(model.Email, model.Token, model.Password);
            return Ok();
        }
        catch (Exception e)
        {
            return StatusCode(500, new ErrorResponse { Message = e.Message, StatusCode = 500 });
        }
    }

    [HttpPost]
    public async Task<IActionResult> ChangeEmail([FromBody] ChangeEmailVm model)
    {
        try
        {
            await service.ChangeEmailAsync(model.UserId, model.NewEmail, model.FirstName, model.LastName);
            return Ok();
        }
        catch (Exception e)
        {
            return StatusCode(500, new ErrorResponse { Message = e.Message, StatusCode = 500 });
        }
    }
}
