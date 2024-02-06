import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AddressService } from 'src/app/services/address.service';


@Component({
  selector: 'app-addresses',
  standalone: true,
  imports: [TranslateModule, FormsModule, CommonModule],
  templateUrl: './addresses.component.html',
  styleUrl: './addresses.component.css'
})
export class AddressesComponent {

  constructor(
    public address: AddressService
  ){

  }
}
