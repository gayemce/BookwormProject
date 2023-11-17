namespace BookwormServer.WebAPI.Models;

public class Category
{
    public int Id { get; set; }
    public string NameEn { get; set; }
    public string NameTr { get; set; }
    public string IconImgUrl { get; set; }
    public bool IsActive { get; set; }
    public bool IsDeleted { get; set; }
}
