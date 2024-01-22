﻿using BookwormServer.WebAPI.Context;
using BookwormServer.WebAPI.Dtos;
using BookwormServer.WebAPI.Models;
using Iyzipay;
using Iyzipay.Model;
using Iyzipay.Request;
using Microsoft.AspNetCore.Mvc;
using System.Globalization;

namespace BookwormServer.WebAPI.Controllers;
[Route("api/[controller]/[action]")]
[ApiController]
public sealed class CartsController : ControllerBase
{
    //[HttpPost]
    //public IActionResult SetShoppingCartsFromLocalStorage(SetShoppingCartsDto request)
    //{

    //}

    [HttpPost]
    public IActionResult Payment(PaymentDto paymentRequest)
    {
        string currency = "";
        double total = 0;
        double shippingAndCartTotal = Convert.ToDouble(paymentRequest.ShippingAndCartTotal);

        foreach (var book in paymentRequest.Books)
        {
            total += Convert.ToDouble(book.Price.Value);
        }

        if (paymentRequest.Currency == "₺")
        {
            currency = "TRY";
        }
        else
        {
            currency = "USD";
        }

        Options options = new Options();
        options.ApiKey = "sandbox-n0iHSihJ3QiTBpPkoZY1eSGxgRFwg5Ij";
        options.SecretKey = "sandbox-YtwDO7drJMVRnTEUMUy4o9ouPRjh2Qb4";
        options.BaseUrl = "https://sandbox-api.iyzipay.com";

        CreatePaymentRequest request = new CreatePaymentRequest();
        request.Locale = Locale.TR.ToString();
        request.ConversationId = Guid.NewGuid().ToString();
        request.Price = total.ToString("F2", CultureInfo.InvariantCulture);  //sepettteki ürünlerin toplam tutarı
        request.PaidPrice = shippingAndCartTotal.ToString("F2", CultureInfo.InvariantCulture); //cart total - karttan çekilecek tutar
        request.Currency = currency; //Request - currency
        request.Installment = 1;
        request.BasketId = Order.GetNewOrderNumber(); //order number
        request.PaymentChannel = PaymentChannel.WEB.ToString();
        request.PaymentGroup = PaymentGroup.PRODUCT.ToString();


        request.PaymentCard = paymentRequest.PaymentCard;

        Buyer buyer = paymentRequest.Buyer;
        buyer.Id = Guid.NewGuid().ToString();
        request.Buyer = paymentRequest.Buyer;

        request.ShippingAddress = paymentRequest.ShippingAddress;
        request.BillingAddress = paymentRequest.BillingAddress;

        List<BasketItem> basketItems = new List<BasketItem>();
        foreach (var book in paymentRequest.Books)
        {
            BasketItem item = new BasketItem();
            item.Category1 = "Book";
            item.Category2 = "Book";
            item.Id = book.Id.ToString();
            item.Name = book.Title.ToString();
            item.ItemType = BasketItemType.PHYSICAL.ToString();
            item.Price = book.Price.Value.ToString("F2", CultureInfo.InvariantCulture);
            basketItems.Add(item);
        }
        request.BasketItems = basketItems;


        Payment payment = Iyzipay.Model.Payment.Create(request, options);
        Console.WriteLine(payment);

        //Ödeme başarıyla alındıysa
        if(payment.Status == "success")
        {
            List<Order> orders = new();
            foreach (var book in paymentRequest.Books)
            {
                Order order = new()
                {
                    OrderNumber = request.BasketId,
                    BookId = book.Id,
                    TotalPrice = new ValueObjects.Money(book.Price.Value, book.Price.Currency),
                    PaymentDate = DateTime.Now,
                    PaymentMethodEn = "Credit Card",
                    PaymentMethodTr = "Kredi Kart",
                    PaymentNumber = payment.PaymentId,
                };
                orders.Add(order);
            }

            AppDbContext context = new();
            context.AddRange(orders);
            context.SaveChanges();

            return NoContent();
        }
        else
        {
            return BadRequest(payment.ErrorMessage);
        }
    }
}
