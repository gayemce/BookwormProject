namespace BookwormServer.WebAPI.Models;

public sealed class Category
{
    public int Id { get; set; }
    public string NameEn { get; set; } = string.Empty;
    public string NameTr { get; set; } = string.Empty;
    public string IconImgUrl { get; set; } = string.Empty;
    public bool IsActive { get; set; } = false;
    public bool IsDeleted { get; set; } = false;
}
