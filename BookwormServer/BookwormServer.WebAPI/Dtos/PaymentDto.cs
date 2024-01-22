using BookwormServer.WebAPI.Models;
using Iyzipay.Model;

namespace BookwormServer.WebAPI.Dtos;

public sealed record PaymentDto(
    List<Book> Books,
    Buyer Buyer,
    Address ShippingAddress,
    Address BillingAddress,
    PaymentCard PaymentCard,
    decimal ShippingAndCartTotal,
    string Currency);
