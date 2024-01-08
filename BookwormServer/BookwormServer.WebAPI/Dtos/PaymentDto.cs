using BookwormServer.WebAPI.Models;

namespace BookwormServer.WebAPI.Dtos;

public sealed record PaymentDto(
    List<Book> Books);
