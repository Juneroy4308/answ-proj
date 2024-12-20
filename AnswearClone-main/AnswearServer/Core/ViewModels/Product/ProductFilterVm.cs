using Core.ViewModels.Pagination;

namespace Core.ViewModels.Product;

public class ProductFilterVm : PaginationVm
{
    public string? Name { get; set; }
    public int? CategoryId { get; set; }
    public int? TargetGroupId { get; set; }
    public bool? IsRandomItems { get; set; }

}
