using BookwormServer.WebAPI.Enums;
using BookwormServer.WebAPI.ValueObjects;

namespace BookwormServer.WebAPI.Models;

public sealed class Cart
{
    public int Id { get; set; }
    public Guid AppUserId { get; set; }
    public AppUser AppUser { get; set; }
    public int BookId { get; set; }
    public Book Book { get; set; }
    public int Quantity { get; set; } = 0;
    public Money TotalPrice { get; set; } = new(0, "₺");
    public ShippingTypeEnumEn ShippingTypeEn { get; set; } = 0;
    public ShippingTypeEnumTr ShippingTypeTr { get; set; } = 0;
    public Money ShippingPrice { get; set; } = new(0, "₺");
}
