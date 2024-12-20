using AutoMapper;
using Core.Entities;
using Core.ViewModels.Category;
using Infrastructure.Data;

namespace Application.Services.PaginationServices;

public class CategoryPaginationService(
    AppDbContext context,
    IMapper mapper
) : PaginationService<CategoryEntity, CategoryVm, CategoryFilterVm>(mapper)
{
    protected override IQueryable<CategoryEntity> GetQuery() => context.Categories;

    protected override IQueryable<CategoryEntity> FilterQuery(IQueryable<CategoryEntity> query, CategoryFilterVm paginationVm)
    {
        if (paginationVm.IsRandomItems == true)
        {
            query = query.OrderBy(c => Guid.NewGuid());
        }
        else
        {
            query = query.OrderBy(c => c.Id);
        }

        if (paginationVm.IsParent == true)
            query = query.Where(c => c.Childrens.Count > 0);

        if (paginationVm.Name is not null)
            query = query.Where(c => c.Name.ToLower().Contains(paginationVm.Name.ToLower()));

        if (paginationVm.TargetGroupId is not null)
            query = query.Where(c => c.TargetGroupId == paginationVm.TargetGroupId);

        return query;
    }
}
