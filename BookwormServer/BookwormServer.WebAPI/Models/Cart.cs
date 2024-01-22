using BookwormServer.WebAPI.Enums;
using BookwormServer.WebAPI.ValueObjects;

namespace BookwormServer.WebAPI.Models;

public sealed class Cart
{
    public int Id { get; set; }
    public int AppUserId { get; set; }
    public AppUser? AppUser { get; set; }
    public int BookId { get; set; }
    public Book? Book { get; set; }
    public int Quantity { get; set; } = 0;
    public Money TotalPrice { get; set; } = new(0, "₺");
    public Money ShippingPrice { get; set; } = new(0, "₺");
}
