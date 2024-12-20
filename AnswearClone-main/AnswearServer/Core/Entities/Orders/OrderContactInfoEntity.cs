using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Core.Entities.Orders;

[Table("tbl_OrderContactInfo")]
public class OrderContactInfoEntity
{
    public int Id { get; set; }

    [Required, StringLength(200)]
    public string FirstName { get; set; } = null!;

    [Required, StringLength(200)]
    public string LastName { get; set; } = null!;

    [Required, StringLength(200)]
    public string Phone { get; set; } = null!;

    [Required, StringLength(200)]
    public string Email { get; set; } = null!;

    [Required, StringLength(200)]
    public string City { get; set; } = null!;

    [Required, StringLength(200)]
    public string Address { get; set; } = null!;
}
