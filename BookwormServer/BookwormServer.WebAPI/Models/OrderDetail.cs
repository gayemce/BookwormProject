using BookwormServer.WebAPI.ValueObjects;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookwormServer.WebAPI.Models;

public sealed class OrderDetail
{
    public int Id { get; set; }
    public int OrderId { get; set; }
    public int BookId { get; set; }
    public Book Book { get; set; }
    public int Quantity { get; set; }
    public Money Price { get; set; } = new(0, "₺");
}
