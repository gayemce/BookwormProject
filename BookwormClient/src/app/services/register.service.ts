import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterModel } from '../models/register.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  request: RegisterModel = new RegisterModel();

  constructor(
    private http: HttpClient,
    private route: Router
  ) { }

  createAccount() {
    this.http.post("", this.request).subscribe({
      next: (res: any) => {

      },
    });
  }
}
