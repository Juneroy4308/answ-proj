using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.ViewModels.User;

public class ForgotPasswordVm
{
    public string Email { get; set; } = null!;
}

public class ResetPasswordVm
{
    public string Email { get; set; } = null!;
    public string Token { get; set; } = null!;
    public string Password { get; set; } = null!;
}

public class ChangeEmailVm
{
    public int UserId { get; set; }
    public string NewEmail { get; set; } = null!;
    public string FirstName { get; set; } = null!;
    public string LastName { get; set; } = null!;
}