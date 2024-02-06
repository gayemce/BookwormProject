namespace BookwormServer.WebAPI.Models;

public sealed class Address
{
    public int Id { get; set; }
    public int AppUserId { get; set; }
    public AppUser? AppUser { get; set; }
    public string Country { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;
    public string? ZipCode { get; set; }
    public string ContactName { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
}
