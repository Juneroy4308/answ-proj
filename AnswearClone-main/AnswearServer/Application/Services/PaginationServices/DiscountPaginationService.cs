using AutoMapper;
using Core.Entities;
using Core.Entities.Discount;
using Core.ViewModels.Category;
using Core.ViewModels.Discount;
using Infrastructure.Data;
using Infrastructure.Data.Repositories;

namespace Application.Services.PaginationServices;

public class DiscountPaginationService(
    AppDbContext context,
    IMapper mapper
) : PaginationService<DiscountEntity, DiscountVm, DiscountFilterVm>(mapper)
{
    protected override IQueryable<DiscountEntity> GetQuery() => context.Discounts;

    protected override IQueryable<DiscountEntity> FilterQuery(IQueryable<DiscountEntity> query, DiscountFilterVm paginationVm)
    {
        if (paginationVm.IsRandomItems == true)
        {
            query = query.OrderBy(c => Guid.NewGuid());
        }
        else
        {
            query = query.OrderBy(c => c.Id);
        }

        if (paginationVm.Name is not null)
            query = query.Where(c => c.Name.ToLower().Contains(paginationVm.Name.ToLower()));


        return query;
    }
}

