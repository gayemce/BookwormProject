import { AddressModel } from "./address.model";
import { BuyerModel } from "./buyer.model";
import { PaymentCardModel } from "./payment-card.model";

export class PaymentModel {
    books: any[] = [];
    buyer: BuyerModel = new BuyerModel;
    shippingAddress: AddressModel = new AddressModel;
    billingAddress: AddressModel = new AddressModel;
    paymentCard: PaymentCardModel = new PaymentCardModel;
    shippingAndCartTotal: number = 0;
    currency: string = "";
}