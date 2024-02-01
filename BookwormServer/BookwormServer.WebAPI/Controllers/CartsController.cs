using BookwormServer.WebAPI.Context;
using BookwormServer.WebAPI.Dtos;
using BookwormServer.WebAPI.Models;
using Iyzipay;
using Iyzipay.Model;
using Iyzipay.Request;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Globalization;

namespace BookwormServer.WebAPI.Controllers;
[Route("api/[controller]/[action]")]
[ApiController]
public sealed class CartsController : ControllerBase
{
    private readonly AppDbContext _context;

    public CartsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public IActionResult AddShoppingCart(AddShoppingCartDto request)
    {
        Book? book = _context.Books.Find(request.BookId);
        if (book is null)
        {
            return StatusCode(422, new { message = "Kitap bulunamadı!" });
        }

        if(book.Quantity == 0)
        {
            return StatusCode(422, new { message = "Kitap stokta kalmadı!" });
        }

        // Kullanıcının sepetinde aynı kitap zaten ekliyse quantity bir artırır.
        Cart? cart = _context.Carts.Where(p => p.BookId == request.BookId && p.AppUserId == request.AppUserId).FirstOrDefault();

        if(cart is not null) 
        {
            cart.Quantity += 1;
        }
        else
        {
            cart = new()
            {
                BookId = request.BookId,
                Price = request.Price,
                Quantity = 1,
                AppUserId = request.AppUserId
            };
        }

        _context.Carts.Add(cart);
        _context.SaveChanges();

        return NoContent();
    }

    [HttpGet("{id}")]
    public IActionResult RemoveById(int id)
    {
        var cart = _context.Carts.Where(p => p.Id == id).FirstOrDefault();
        if(cart is not null)
        {
            _context.Carts.Remove(cart);
            _context.SaveChanges();
        }

        return NoContent();
    }

    [HttpGet("{userId}")]
    public IActionResult GetAll(int userId)
    {
        List<CartResponseDto> carts = _context.Carts.Where(p => p.AppUserId == userId).AsNoTracking().Include(p => p.Book).Select(s => new CartResponseDto()
        {
            Author = s.Book!.Author,
            AuthorId = s.Book.AuthorId,
            CreatedAt = s.Book.CreatedAt,
            Id = s.Book.Id,
            IsActive = s.Book.IsActive,
            ImgUrl = s.Book.ImgUrl,
            IsDeleted = s.Book.IsDeleted,
            IsFeatured  = s.Book.IsFeatured,
            Price = s.Price, //sepet
            Quantity = s.Quantity, //sepet
            BookDetail = s.Book.BookDetail,
            Title = s.Book.Title,
            Publisher = s.Book.Publisher,
            BookLanguage = s.Book.BookLanguage,
            BookCategories = s.Book.BookCategories,
            CartId = s.Id
        }).ToList();

        return Ok(carts);
    }

    [HttpPost]
    public IActionResult SetShoppingCartsFromLocalStorage(List<SetShoppingCartsDto> request)
    {
        List<Cart> carts = new();

        foreach (var item in request)
        {
            Cart cart = new()
            {
                BookId = item.BookId,
                AppUserId = item.AppUserId,
                Quantity = item.Quantity,
                Price = item.Price
            };

            carts.Add(cart);
        }

        _context.AddRange(carts);
        _context.SaveChanges();

        return NoContent();
    }

    [HttpPost]
    public IActionResult Payment(PaymentDto paymentRequest)
    {
        string currency = "";
        double total = 0;
        double shippingAndCartTotal = Convert.ToDouble(paymentRequest.ShippingAndCartTotal);

        foreach (var item in paymentRequest.Books)
        {
            Book? checkBook = _context.Books.Find(item.Id);
            if(checkBook is not null)
            {
                if (item.Quantity > checkBook.Quantity)
                {
                    return StatusCode(422, new { message = "Kitap stoğu yeterli değil. Lütfen daha az adet ile tekrar deneyin"});
                }
            }
            
        }

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
        request.Price = total.ToString("F2", CultureInfo.InvariantCulture);  //sepettteki ürünlerin adet tutarı olarak alındı
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
            foreach (var item in paymentRequest.Books)
            {
                Book? book = _context.Books.Find(item.Id);

                if(book is not null)
                {
                    if (book.Quantity >= 0)
                    {
                        if (item.Quantity > book.Quantity)
                        {
                            return StatusCode(422, new { message = $"{item.Quantity} adet için kitap stoğu yeterli değil. Almak istediğiniz kitaptan {book.Quantity} adet bulunmaktadır." });
                        }
                    }
                    if (book.Quantity > 0 && (item.Quantity <= book.Quantity))
                    {
                        book.Quantity -= item.Quantity;
                    }
                }
            }
            _context.Books.UpdateRange();

            string orderNumber = Order.GetNewOrderNumber();

            List<Order> orders = new();
            
            foreach (var book in paymentRequest.Books)
            {
                Order order = new()
                {
                    OrderNumber = orderNumber,
                    BookId = book.Id,
                    Price = new ValueObjects.Money(book.Price.Value, book.Price.Currency),
                    Quantity = book.Quantity,
                    PaymentDate = DateTime.Now,
                    PaymentMethod = "Credit Card",
                    AppUserId = paymentRequest.AppUserId,
                    PaymentNumber = payment.PaymentId,
                };
                orders.Add(order);
            }
            
            _context.Orders.AddRange(orders);

            AppUser? user = _context.AppUsers.Find(paymentRequest.AppUserId);
            if (user is not null)
            {
                var carts = _context.Carts.Where(p => p.AppUserId == paymentRequest.AppUserId).ToList();
                _context.RemoveRange(carts);
            }
            
            _context.SaveChanges();

            return NoContent();
        }
        else
        {
            return BadRequest(payment.ErrorMessage);
        }
    }
}