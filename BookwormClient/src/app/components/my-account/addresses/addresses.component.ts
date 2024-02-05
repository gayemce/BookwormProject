import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { Cities } from 'src/app/constants/cities';
import { Countries } from 'src/app/constants/countries';

@Component({
  selector: 'app-addresses',
  standalone: true,
  imports: [TranslateModule, FormsModule, CommonModule],
  templateUrl: './addresses.component.html',
  styleUrl: './addresses.component.css'
})
export class AddressesComponent {

  isShippingAddress: boolean = false;
  isBillingAddress: boolean = false;
  countries = Countries;
  cities = Cities;

  constructor() {

  }

  editShippingAddress() {
    this.isShippingAddress = !this.isShippingAddress;
  }

  editBillingAddress() {
    this.isBillingAddress = !this.isBillingAddress;
  }
}
