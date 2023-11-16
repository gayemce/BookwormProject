namespace BookwormServer.WebAPI.Models;

public sealed class Book
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Author { get; set; } = string.Empty;
    public string DescriptionEn { get; set; } = string.Empty;
    public string DescriptionTr { get; set; } = String.Empty;
    public string Publisher { get; set; } = string.Empty;
    public decimal Price { get; set; } = 0.0m;
    public string ImgUrl { get; set; } = string.Empty;
    public int Quantity { get; set; } = 0;
    public bool IsActive { get; set; } = false;
    public bool IsDeleted { get; set; } = false;
    public DateTime CreatedAt { get; set; } = DateTime.Now;
}
