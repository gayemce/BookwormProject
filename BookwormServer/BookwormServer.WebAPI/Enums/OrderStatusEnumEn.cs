namespace BookwormServer.WebAPI.Enums;

public enum OrderStatusEnumEn
{
    AwatingApproval = 0, //Onay bekliyor
    BeingPrepared = 1, //Hazırlanıyor
    InTransit = 2, //Taşınma aşamasında
    Delivered = 3, //Teslim edildi
    Rejected = 4, //Reddedildi
    Returned = 5 //İade edildi
}
