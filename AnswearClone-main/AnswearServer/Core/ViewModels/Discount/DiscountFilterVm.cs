using Core.ViewModels.Pagination;

namespace Core.ViewModels.Discount;

public class DiscountFilterVm : PaginationVm
{
    public string? Name { get; set; }
    public bool? IsRandomItems { get; set; }
}
