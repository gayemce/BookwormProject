namespace BookwormServer.WebAPI.Models;

public sealed class Review
{
    public int Id { get; set; }
    public int BookId { get; set; }
    public Book? Book { get; set; }
    public int AppUserId { get; set; }
    public AppUser? AppUser { get; set; }
    public short Raiting { get; set; } = 0;
    public string? TitleEn { get; set; } = string.Empty;
    public string? TitleTr { get; set; } = string.Empty;
    public string? CommentEn { get; set; } = string.Empty;
    public string? CommentTr { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.Now;
}
