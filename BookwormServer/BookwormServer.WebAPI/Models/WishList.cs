namespace BookwormServer.WebAPI.Models;

public sealed class WishList
{
    public int Id { get; set; }
    public int BookId { get; set; }
    public Book Book { get; set; }
    public int AppUserId { get; set; }
    public AppUser AppUser { get; set; }
}
