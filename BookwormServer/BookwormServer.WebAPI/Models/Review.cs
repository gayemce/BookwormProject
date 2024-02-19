namespace BookwormServer.WebAPI.Models;

public sealed class Review
{
    public int Id { get; set; }
    public int BookId { get; set; }
    public Book? Book { get; set; }
    public int AppUserId { get; set; }
    public AppUser? AppUser { get; set; }
    public short Raiting { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Comment { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
}
