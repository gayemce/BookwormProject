namespace BookwormServer.WebAPI.Models;

public sealed class Author
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Lastname { get; set; } = string.Empty;
    public string? AboutEn { get; set; }
    public string? AboutTr { get; set; }
    public bool isActive { get; set; } = true;
    public string ProfileImgUrl { get; set; } = string.Empty;
    public int PublishedBooksCount { get; set; }

    public void IncrementPublishedBooksCount()
    {
        PublishedBooksCount++;
    }

    public void DecrementPublishedBooksCount()
    {
        if(PublishedBooksCount > 0)
        {
            PublishedBooksCount--;
        }
    }

    //Author author = new Author();
    //author.IncrementPublishedBooksCount();
    //author.DecrementPublishedBooksCount();

}
