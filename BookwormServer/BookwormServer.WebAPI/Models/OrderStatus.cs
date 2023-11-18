using BookwormServer.WebAPI.Enums;

namespace BookwormServer.WebAPI.Models;

public sealed class OrderStatus
{
    public int Id { get; set; }
    public string OrderNumber { get; set; } = string.Empty;
    public OrderStatusEnumEn StatusEn { get; set; } = 0;
    public OrderStatusEnumTr StatusTr { get; set; } = 0;
    public DateTime StatusDate { get; set; } = DateTime.Now;
}
