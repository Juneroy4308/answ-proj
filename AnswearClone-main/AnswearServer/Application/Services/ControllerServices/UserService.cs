﻿using AutoMapper;
using Core.Interfaces.Repositories;
using Core.Interfaces.Services;
using Core.Interfaces;
using Core.ViewModels.User;
using Microsoft.AspNetCore.Identity;
using Core.Entities.Identity;
using Core.ViewModels.Category;
using Core.Constants;
using static Google.Apis.Auth.GoogleJsonWebSignature;
using Microsoft.Extensions.Configuration;
using Core.SMTP;

namespace Application.Services.ControllerServices;

public class UserService(
    IUserRepository repository,
    IMapper mapper,
    IJwtTokenService jwtTokenService,
    UserManager<UserEntity> userManager,
    IConfiguration configuration,
    IEmailService emailService
    ) : IUserService
{
    public async Task<UserVm> GetUserByIdAsync(int id)
    {
        var entity = await repository.GetByIdAsync(id);

        return mapper.Map<UserVm>(entity);
    }

    public async Task<IEnumerable<UserVm>> GetAllUsersAsync()
    {
        var entities = await repository.GetAllAsync();

        return mapper.Map<List<UserVm>>(entities);
    }

    public async Task DeleteUserAsync(int id)
    {
        UserEntity? user = await userManager.FindByIdAsync(id.ToString());

        if (user is null)
            throw new Exception("User not found");

        var result = await userManager.DeleteAsync(user);

        if (!result.Succeeded)
            throw new Exception("Failed to delete user");
    }

    public async Task<string> AddUserAsync(SignUpVm user)
    {
        UserEntity newUser = mapper.Map<UserEntity>(user);

        try
        {
            var identityResult = await userManager.CreateAsync(newUser, user.Password);
            if (!identityResult.Succeeded)
                throw new Exception("Failed to create user");

        }
        catch (Exception ex)
        {
            throw new Exception("Failed to create user");
        }



        var roleResult = await userManager.AddToRoleAsync(newUser, Roles.User);

        if (!roleResult.Succeeded)
            throw new Exception("Failed to create user");

        return await jwtTokenService.CreateTokenAsync(newUser);
    }

    public async Task UpdateUserAsync(UserUpdateVm userVm)
    {
        var user = await userManager.FindByIdAsync(userVm.Id.ToString());

        if (user is null)
            throw new Exception("User not found");

        if (!string.IsNullOrEmpty(userVm.FirstName))
            user.FirstName = userVm.FirstName;

        if (!string.IsNullOrEmpty(userVm.LastName))
            user.LastName = userVm.LastName;

        if (!string.IsNullOrEmpty(userVm.UserName))
            user.UserName = userVm.UserName;

        if (!string.IsNullOrEmpty(userVm.Email))
            user.Email = userVm.Email;

        if (!string.IsNullOrEmpty(userVm.PhoneNumber))
            user.PhoneNumber = userVm.PhoneNumber;

        var result = await userManager.UpdateAsync(user);

        if (!result.Succeeded)
            throw new Exception("Failed to update user");

        if (!string.IsNullOrEmpty(userVm.Password))
        {
            var token = await userManager.GeneratePasswordResetTokenAsync(user);
            var passwordResult = await userManager.ResetPasswordAsync(user, token, userVm.Password);

            if (!passwordResult.Succeeded)
                throw new Exception("Failed to update password");
        }
    }

    public async Task<string> SignInAsync(SignInVm model)
    {
        UserEntity? user = await userManager.FindByEmailAsync(model.Email);

        if (user is null || !await userManager.CheckPasswordAsync(user, model.Password))
            throw new UnauthorizedAccessException("Wrong authentication data");

        if (user.LockoutEnd > DateTimeOffset.Now)
        {
            throw new UnauthorizedAccessException("Your account is currently blocked. Please try again later.");
        }

        return await jwtTokenService.CreateTokenAsync(user);
    }


    public async Task<string> GoogleSignInAsync(GoogleSignInVm model)
    {
        Payload payload = await GetPayloadAsync(model.Credential);

        UserEntity? user = await userManager.FindByEmailAsync(payload.Email);

        if (user != null)
        {
            if (user.LockoutEnd > DateTimeOffset.UtcNow)
            {
                throw new UnauthorizedAccessException("Your account is currently blocked. Please try again later.");
            }
        }
        else
        {
            user = await CreateGoogleUserAsync(payload);
        }

        //user ??= await CreateGoogleUserAsync(payload);

        return await jwtTokenService.CreateTokenAsync(user);
    }

    private async Task<Payload> GetPayloadAsync(string credential)
    {
        return await ValidateAsync(
            credential,
            new ValidationSettings
            {
                Audience = [configuration["Authentication:Google:ClientId"]]
            }
        );
    }

    private async Task<UserEntity> CreateGoogleUserAsync(Payload payload)
    {
        var user = new UserEntity
        {
            FirstName = payload.GivenName,
            LastName = payload.FamilyName,
            Email = payload.Email,
            UserName = payload.Email,
        };

        var identityResult = await userManager.CreateAsync(user);

        if (!identityResult.Succeeded)
            throw new Exception("Failed to create user");

        var roleResult = await userManager.AddToRoleAsync(user, Roles.User);

        if (!roleResult.Succeeded)
            throw new Exception("Failed to create user");

        return user;
    }

    public async Task BlockUserAsync(int id, TimeSpan lockoutDuration)
    {
        UserEntity? user = await userManager.FindByIdAsync(id.ToString());

        if (user is null)
            throw new Exception("User not found");

        if (user.LockoutEnabled && user.LockoutEnd > DateTimeOffset.UtcNow)
            throw new Exception("User is already locked out");

        user.LockoutEnabled = true;
        user.LockoutEnd = DateTimeOffset.UtcNow.Add(lockoutDuration);

        var result = await userManager.UpdateAsync(user);

        if (!result.Succeeded)
            throw new Exception("Failed to block user");
    }

    public async Task UnlockUserAsync(int id)
    {
        // Знайти користувача за ID
        UserEntity? user = await userManager.FindByIdAsync(id.ToString());

        if (user is null)
            throw new Exception("User not found");

        // Перевірити, чи користувач заблокований
        if (!user.LockoutEnabled || user.LockoutEnd <= DateTimeOffset.UtcNow)
            throw new Exception("User is not locked out");

        // Встановити властивості для розблокування
        user.LockoutEnd = null;
        user.LockoutEnabled = false;

        // Оновити користувача в базі даних
        var result = await userManager.UpdateAsync(user);

        if (!result.Succeeded)
            throw new Exception("Failed to unlock user");
    }

    public async Task GeneratePasswordResetTokenAsync(string email)
    {
        var url = configuration["PasswordReset:CallbackUrl"]
               ?? throw new NullReferenceException("PasswordReset:CallbackUrl");

        var user = await userManager.FindByEmailAsync(email);

        if (user == null)
        {
            return;
        }

        var token = await userManager.GeneratePasswordResetTokenAsync(user);

        var callbackUrl = $"{url}?token={token}&email={email}";

        var message = new Message()
        {
            To = user.Email,
            Name = user.FirstName,
            Body = callbackUrl
        };

        await emailService.SendAsync(message);
    }

    public async Task ResetPasswordAsync(string email, string token, string newPassword)
    {
        var user = await userManager.FindByEmailAsync(email);
        if (user == null)
        {
            return;
        }

        var resetToken = await userManager.GeneratePasswordResetTokenAsync(user);


        var result = await userManager.ResetPasswordAsync(user, resetToken, newPassword);

        if (!result.Succeeded)
        {
            var errors = string.Join(", ", result.Errors.Select(e => e.Description));
            throw new Exception($"Password reset failed: {errors}");
        }
    }

    public async Task ChangeEmailAsync(int userId, string newEmail, string firstName, string lastName)
    {
        var user = await userManager.FindByIdAsync(userId.ToString());
        if (user == null)
        {
            throw new Exception("User not found.");
        }

        var emailChangeToken = await userManager.GenerateChangeEmailTokenAsync(user, newEmail);

        var result = await userManager.ChangeEmailAsync(user, newEmail, emailChangeToken);
        if (!result.Succeeded)
        {
            var errors = string.Join(", ", result.Errors.Select(e => e.Description));
            throw new Exception($"Email change failed: {errors}");
        }

        user.UserName = newEmail;

        if (firstName != null)
            user.FirstName = firstName;

        if (lastName != null)
            user.LastName = lastName;

        var updateResult = await userManager.UpdateAsync(user);
        if (!updateResult.Succeeded)
        {
            var updateErrors = string.Join(", ", updateResult.Errors.Select(e => e.Description));
            throw new Exception($"User update failed: {updateErrors}");
        }

        await userManager.UpdateNormalizedEmailAsync(user);
    }
}
