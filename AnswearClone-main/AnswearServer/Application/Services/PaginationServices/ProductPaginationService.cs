using AutoMapper;
using Core.Entities;
using Core.ViewModels.Category;
using Core.ViewModels.Product;
using Core.ViewModels.TargetGroup;
using Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services.PaginationServices;

public class ProductPaginationService(
    AppDbContext context,
    IMapper mapper
) : PaginationService<ProductEntity, ProductVm, ProductFilterVm>(mapper)
{
    protected override IQueryable<ProductEntity> GetQuery() => context.Products;

    protected override IQueryable<ProductEntity> FilterQuery(IQueryable<ProductEntity> query, ProductFilterVm paginationVm)
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



        if (paginationVm.TargetGroupId is not null)
            query = query.Where(c => c.Category.TargetGroupId == paginationVm.TargetGroupId);

        //if (paginationVm.CategoryId is not null)
        //    query = query.Where(c => c.CategoryId == paginationVm.CategoryId);

        if (paginationVm.CategoryId is not null)
        {
            var childCategoryIds = context.Categories
               .Where(cat => cat.ParentId == paginationVm.CategoryId || cat.Id == paginationVm.CategoryId)
               .Select(cat => cat.Id)
               .ToList();

            query = query.Where(c => childCategoryIds.Contains(c.CategoryId));
        }

        return query;
    }
}

