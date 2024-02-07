import { Injectable } from '@angular/core';
import { Countries } from '../constants/countries';
import { Cities } from '../constants/cities';
import { AddAddresModel } from '../models/add-address-model';
import { UpdateAddresModel } from '../models/update-address-model';
import { AddressModel } from '../models/address.model';
import { AuthService } from './auth.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from './error.service';
import { SwalService } from './swal.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  isShippingAddress: boolean = false;
  isBillingAddress: boolean = false;
  isaddShippingAddress: boolean = false;
  isaddBillingAddress: boolean = false;

  countries = Countries;
  cities = Cities;

  shippingRequestAdd: AddAddresModel = new AddAddresModel();
  shippingRequestUpdate: UpdateAddresModel = new UpdateAddresModel();
  billingRequestAdd: AddAddresModel = new AddAddresModel();
  billingRequestUpdate: UpdateAddresModel = new UpdateAddresModel();

  shippingAddress: AddressModel = new AddressModel;
  billingAddress: AddressModel = new AddressModel;

  addressId: number = 0;
  contactName: string = "";
  country: string = "";
  city: string = "";
  zipCode: string = "";
  description: string = "";

  billingAddressId: number = 0;
  billingContactName: string = "";
  billingCountry: string = "";
  billingCity: string = "";
  billingZipCode: string = "";
  billingDescription: string = "";

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private error: ErrorService,
    private translate: TranslateService,
    private swal: SwalService
  ) {
    this.get();
    this.getBillingAddress();
  }

  addShippingAddress(){
    this.isaddShippingAddress = true;
  }

  addBillingAddress(){
    this.isaddBillingAddress = true;
  }

  editShippingAddress() {
    this.isShippingAddress = !this.isShippingAddress;
  }

  editBillingAddress() {
    this.isBillingAddress = !this.isBillingAddress;
  }

  addButton(){
    this.editShippingAddress();
    this.create();
  }

  addBillingButton(){
    this.editBillingAddress();
    this.createBillingAddress();
  }

  updateButton(){
    this.editShippingAddress();
    this.update();
  }

  updateBillingButton(){
    this.editBillingAddress();
    this.updateBillingAddress();
  }

  get(){
    this.auth.checkAuthentication();
    this.http.get("https://localhost:7018/api/Addresses/Get/" + this.auth.token.userId).subscribe({
      next: (res: any) => {
        this.shippingAddress = res;
        console.log(this.shippingAddress);
        this.addressId = this.shippingAddress.id;
        this.contactName = this.shippingAddress.contactName;
        this.country = this.shippingAddress.country;
        this.city = this.shippingAddress.city;
        this.zipCode = this.shippingAddress.zipCode;
        this.description = this.shippingAddress.description;
      },
      error: (err: HttpErrorResponse) => {
        this.error.errorHandler(err);        
      }
    })
  } 

  create(){
    this.auth.checkAuthentication();
    this.shippingRequestAdd.appUserId = Number(this.auth.token.userId);
    this.shippingRequestAdd.contactName = this.contactName;
    this.shippingRequestAdd.country = this.country;
    this.shippingRequestAdd.city = this.city;
    this.shippingRequestAdd.zipCode = this.zipCode;
    this.shippingRequestAdd.description = this.description;

    this.http.post("https://localhost:7018/api/Addresses/Create", this.shippingRequestAdd).subscribe({
      next: (res: any) => {
        this.shippingAddress = res;
        this.translate.get("Shipping address added").subscribe(
          (res: any) => {
            this.swal.callToast(res, 'success');
          }
        )
        setTimeout(() => {
          location.reload();
        }, 3000);
      },
      error: (err: HttpErrorResponse) => {
        this.error.errorHandler(err);        
      }
    })
  }

  update(){
    this.auth.checkAuthentication();
    this.shippingRequestUpdate.id = this.addressId;
    this.shippingRequestUpdate.appUserId = Number(this.auth.token.userId);
    this.shippingRequestUpdate.contactName = this.contactName;
    this.shippingRequestUpdate.country = this.country;
    this.shippingRequestUpdate.city = this.city;
    this.shippingRequestUpdate.zipCode = this.zipCode;
    this.shippingRequestUpdate.description = this.description;

    this.http.post("https://localhost:7018/api/Addresses/Update", this.shippingRequestUpdate).subscribe({
      next: (res: any) => {
        this.shippingAddress = res;
        this.translate.get("Shipping address updated").subscribe(
          (res: any) => {
            this.swal.callToast(res, 'success');
          }
        )
        setTimeout(() => {
          location.reload();
        }, 3000);
      },
      error: (err: HttpErrorResponse) => {
        this.error.errorHandler(err);        
      }
    })
  }

  getBillingAddress(){
    this.auth.checkAuthentication();
    this.http.get("https://localhost:7018/api/Addresses/billingAddresGet/" + this.auth.token.userId).subscribe({
      next: (res: any) => {
        this.billingAddress = res;
        this.billingAddressId = this.billingAddress.id;
        this.billingContactName = this.billingAddress.contactName;
        this.billingCountry = this.billingAddress.country;
        this.billingCity = this.billingAddress.city;
        this.billingZipCode = this.billingAddress.zipCode;
        this.billingDescription = this.billingAddress.description;
      },
      error: (err: HttpErrorResponse) => {
        this.error.errorHandler(err);        
      }
    })
  } 

  createBillingAddress(){
    this.auth.checkAuthentication();
    this.billingRequestAdd.appUserId = Number(this.auth.token.userId);
    this.billingRequestAdd.contactName = this.billingContactName;
    this.billingRequestAdd.country = this.billingCountry;
    this.billingRequestAdd.city = this.billingCity;
    this.billingRequestAdd.zipCode = this.billingZipCode;
    this.billingRequestAdd.description = this.billingDescription;

    this.http.post("https://localhost:7018/api/Addresses/billingAddressCreate", this.billingRequestAdd).subscribe({
      next: (res: any) => {
        this.billingAddress = res;
        this.translate.get("Billing address added").subscribe(
          (res: any) => {
            this.swal.callToast(res, 'success');
          }
        )
        setTimeout(() => {
          location.reload();
        }, 3000);
      },
      error: (err: HttpErrorResponse) => {
        this.error.errorHandler(err);        
      }
    })
  }

  updateBillingAddress(){
    this.auth.checkAuthentication();
    this.billingRequestUpdate.id = this.billingAddressId;
    this.billingRequestUpdate.appUserId = Number(this.auth.token.userId);
    this.billingRequestUpdate.contactName = this.billingContactName;
    this.billingRequestUpdate.country = this.billingCountry;
    this.billingRequestUpdate.city = this.billingCity;
    this.billingRequestUpdate.zipCode = this.billingZipCode;
    this.billingRequestUpdate.description = this.billingDescription;

    this.http.post("https://localhost:7018/api/Addresses/billingAddressUpdate", this.billingRequestUpdate).subscribe({
      next: (res: any) => {
        this.billingAddress = res;
        this.translate.get("Billing address updated").subscribe(
          (res: any) => {
            this.swal.callToast(res, 'success');
          }
        )
        setTimeout(() => {
          location.reload();
        }, 3000);
      },
      error: (err: HttpErrorResponse) => {
        this.error.errorHandler(err);        
      }
    })
  }
}
