namespace BookwormServer.WebAPI.Models;

public sealed class BookDiscount
{
    public int Id { get; set; }
    public int BookId { get; set; }
    public Book? Book { get; set; }
    public int DiscountPercentage { get; set; } = 0;
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public decimal DiscountedPrice { get; set; } = 0;
}