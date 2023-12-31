﻿using BookwormServer.WebAPI.Enums;
using BookwormServer.WebAPI.ValueObjects;

namespace BookwormServer.WebAPI.Models;

public sealed class Order
{
    public int Id { get; set; }
    public string OrderNumber { get; set; } = string.Empty;
    public int BookId { get; set; }
    public Book Book { get; set; }
    public int AppUserId { get; set; }
    public AppUser AppUser { get; set; }
    public Money TotalPrice { get; set; } = new(0, "₺");
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public DateTime PaymentDate { get; set; } = DateTime.Now;
    public PaymentMethodEnumEn PaymentMethodEn { get; set; } = 0;
    public PaymentMethodTr PaymentMethodTr { get; set; } = 0;
    public string PaymentNumber { get; set; }
}
