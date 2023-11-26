namespace BookwormServer.WebAPI.Dtos;

public class CreateAuthorDto
{
    public string Name { get; set; }
    public string Lastname { get; set; }
    public string AboutEn { get; set; }
    public string AboutTr { get; set; }
    public bool isActive { get; set; }
    public string ProfileImgUrl { get; set; } = string.Empty;
    public int PublishedBooksCount { get; set; }
}
