using Core.ViewModels.Pagination;

namespace Core.ViewModels.Category;

public class CategoryFilterVm : PaginationVm
{
    public string? Name { get; set; }
    public int? TargetGroupId { get; set; }
    public bool? IsRandomItems { get; set; }
    public bool? IsParent { get; set; }

}
