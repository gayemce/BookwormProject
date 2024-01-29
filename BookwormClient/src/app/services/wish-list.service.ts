import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from './error.service';
import { BookModel } from '../models/book.model';
import { AddToWishListModel } from '../models/add-to-wish-list.model';
import { TranslateService } from '@ngx-translate/core';
import { SwalService } from './swal.service';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishListService {

  wishList: any[] = [];
  
  constructor(
    private translate: TranslateService,
    private swal: SwalService,
    private http: HttpClient,
    private error: ErrorService,
    private auth: AuthService
  ) {
    this.checkLocalStorageForWishList();
   }

  checkLocalStorageForWishList(){
    if(localStorage.getItem('response')){
      this.auth.checkAuthentication();
      console.log(this.auth.token.userId);
      this.http.get("https://localhost:7018/api/WishLists/GetAllWishList/" + this.auth.token.userId).subscribe(
        {
          next: (res: any) => {
            this.wishList = res;
            console.log(this.wishList);
          },
          error: (err: HttpErrorResponse) => {
            this.error.errorHandler(err);
          }
        }
      )
    }
    else{
      this.wishList = [];
      localStorage.setItem('wishList', JSON.stringify(this.wishList));
    }
  }

  addToWishList(book: BookModel) {
    if(localStorage.getItem('response')) {

      const data: AddToWishListModel = new AddToWishListModel();
      data.bookId = book.id;
      data.appUserId = Number(this.auth.token.userId);

      this.http.post("https://localhost:7018/api/WishLists/AddToWishList", data).subscribe({
        next: (res: any) => {
          this.wishList.push(book);
          localStorage.setItem('wishList', JSON.stringify(this.wishList));
          this.checkLocalStorageForWishList();

          this.translate.get("bookAddedToWishlist").subscribe(
            res => {
              this.swal.callToast(res, 'success');
            }
          )
        },
        error: (err: HttpErrorResponse) => {
          this.error.errorHandler(err);
        }
      });
    }
    else {
      forkJoin({
        title: this.translate.get("pleaseLoginToAddTheProductToFavorites"),
        confirm: this.translate.get("confirmButton")
      }).subscribe(res => {
        this.swal.callSwalTwo(res.title, res.confirm, () => {

        })
      })
    }
  }

  removeFromWishListByIndex(index: number) {
    forkJoin({
      delete: this.translate.get("remove.doYouWantToDeleted"),
      cancel: this.translate.get("remove.cancelButton"),
      confirm: this.translate.get("remove.confirmButton")
    }).subscribe(res => {
      this.swal.callSwal(res.delete, res.cancel, res.confirm, () => {

        if (localStorage.getItem("response")) {
          this.http.get("https://localhost:7018/api/WishLists/removeFromWishListById/" + this.wishList[index]?.wishListId).subscribe(res => {
            this.checkLocalStorageForWishList();
          });
        }
      });
    })
  }
}
