using Core.ViewModels.Product;

namespace Core.ViewModels.Basket;

public class BasketItemVm
{
    public int ProductVariationId { get; set; }
    public ProductVariationVm? ProductVariation { get; set; }
    public int Count { get; set; }
}
