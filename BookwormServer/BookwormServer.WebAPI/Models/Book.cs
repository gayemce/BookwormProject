using BookwormServer.WebAPI.ValueObjects;

namespace BookwormServer.WebAPI.Models;

public sealed class Book
{
    public int Id { get; set; }
    public int AuthorId { get; set; }
    public Author? Author { get; set; }
    public int BookLanguageId { get; set; }
    public BookLanguage? BookLanguage { get; set; }
    public int BookDetailId { get; set; }
    public BookDetail? BookDetail { get; set; }
    public string Title { get; set; } = string.Empty;
    public string DescriptionEn { get; set; } = string.Empty;
    public string DescriptionTr { get; set; } = String.Empty;
    public string Publisher { get; set; } = string.Empty;
    public Money Price { get; set; } = new(0, "₺");
    public string ImgUrl { get; set; } = string.Empty;
    public int Quantity { get; set; } = 0;
    public bool IsFeatured { get; set; } = false;
    public bool IsActive { get; set; } = true;
    public bool IsDeleted { get; set; } = false;
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public List<BookCategory>? BookCategories { get; set; } //DAHA SONRA NULL OLAMAZ ŞEKİLDE DÜZELTİLECEK!

}
