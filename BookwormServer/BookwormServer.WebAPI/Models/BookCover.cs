using BookwormServer.WebAPI.Enums;

namespace BookwormServer.WebAPI.Models;

public class BookCover
{
    public int Id { get; set; }
    public int BookId { get; set; }
    public Book Book { get; set; }
    public BookCoverTypeEn CoverTypeEn { get; set; }
    public BookCoverTypeTr CoverTypeTr { get; set; }
}
