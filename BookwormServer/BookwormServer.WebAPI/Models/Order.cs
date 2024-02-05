using BookwormServer.WebAPI.Context;
using BookwormServer.WebAPI.Enums;
using BookwormServer.WebAPI.ValueObjects;

namespace BookwormServer.WebAPI.Models;

public sealed class Order
{
    public int Id { get; set; }
    public string OrderNumber { get; set; } = string.Empty;
    public int BookId { get; set; }
    public Book? Book { get; set; }
    public int? AppUserId { get; set; }
    public AppUser? AppUser { get; set; }
    public Money Price { get; set; } = new(0, "₺");
    public int Quantity { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public DateTime PaymentDate { get; set; } = DateTime.Now;
    public string PaymentMethodEn { get; set; } = string.Empty;
    public string PaymentMethodTr { get; set; } = string.Empty;
    public string PaymentNumber { get; set; } = string.Empty;
    public string StatusEn { get; set; } = string.Empty;
    public string StatusTr { get; set; } = string.Empty;

    public static string GetNewOrderNumber()
    {
        string initialLetter = "GYT"; //seri numarası
        string year = DateTime.Now.Year.ToString();
        string newOrderNumber = initialLetter + year;

        AppDbContext context = new();
        var lastOrder = context.Orders.OrderByDescending(o => o.Id).FirstOrDefault();
        
        if (lastOrder is not null) //son sipariş varsa
        {
            string currentOrderNumber = lastOrder.OrderNumber; //son siparişin, sipariş numarası
            string currentYear = currentOrderNumber.Substring(2, 4);
            int startIndex = (currentYear == year) ? 7 : 0; //for substring
            GenerateUniqueOrderNumber(context, ref newOrderNumber, currentOrderNumber.Substring(startIndex)); //ref: referans
        }
        else
        {
            newOrderNumber += "000000001"; //ilk sipariş
        }

        return newOrderNumber;
    }

    private static void GenerateUniqueOrderNumber(AppDbContext context, ref string newOrderNumber, string currentOrderNumStr)
    {
        int currentOrderNumberInt = int.TryParse(currentOrderNumStr, out var num) ? num : 0;
        bool isOrderNumberUnique = false;

        while (!isOrderNumberUnique)
        {
            currentOrderNumberInt++;
            string potentialOrderNumber = newOrderNumber + currentOrderNumberInt.ToString("D9");
            var order = context.Orders.FirstOrDefault(o => o.OrderNumber == potentialOrderNumber);
            if (order == null)
            {
                newOrderNumber = potentialOrderNumber; // Yalnızca yeni sipariş numarasını güncelle
                isOrderNumberUnique = true;
            }
        }
    }

}