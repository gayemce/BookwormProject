namespace BookwormServer.WebAPI.Dtos;

public sealed record CreateCategoryDto(
    string NameEn,
    string NameTr,
    string IconImgUrl,
    bool IsActive = true,
    bool IsDeleted = false);
