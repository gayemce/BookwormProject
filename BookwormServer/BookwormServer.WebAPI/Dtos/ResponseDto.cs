namespace BookwormServer.WebAPI.Dtos;

public sealed class ResponseDto<T>
{
    public T Data { get; set; }
    public int TotalPageCount { get; set; }
    public int PageNumber { get; set; }
    public int PageSize { get; set; }
    public bool IsFirstPage { get; set; }
    public bool IsLastPage { get; set; }
    public string OrderBy { get; set; }
}
