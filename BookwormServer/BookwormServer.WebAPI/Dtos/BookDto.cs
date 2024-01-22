using BookwormServer.WebAPI.Models;
using BookwormServer.WebAPI.ValueObjects;

namespace BookwormServer.WebAPI.Dtos;

public class BookDto
{
    public int Id { get; set; }
    public AuthorDto Author { get; set; }
    public BookLanguageDto BookLanguage { get; set; }
    public BookDetailDto BookDetail { get; set; }
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
    public List<BookCategoryDto> BookCategories { get; set; } = new List<BookCategoryDto>();
}
