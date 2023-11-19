namespace BookwormServer.WebAPI.Dtos;

public sealed record AuthorDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Lastname { get; set; }
}
