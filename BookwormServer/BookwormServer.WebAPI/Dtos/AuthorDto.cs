namespace BookwormServer.WebAPI.Dtos;

public class AuthorDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Lastname { get; set; }
    public string AboutEn { get; set; }
    public string AboutTr { get; set; }
    public string ProfileImgUrl { get; set; }
    public int PublishedBooksCount { get; set; }
}
