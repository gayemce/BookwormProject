import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { SwalService } from "./swal.service";

@Injectable({
    providedIn: 'root'
})

export class ErrorService {

    constructor(
        private translate: TranslateService,
        private swal: SwalService
    ) { }

    errorHandler(err: HttpErrorResponse) {
        console.log(err);

        switch (err.status) {
            case 0:
                this.translate.get("apiNotAvailable").subscribe(res => {
                    this.swal.callToast(res, "error");
                });
                break;

            case 400:
                const error400 =  err.error || err.error[0] || err.error[0].message || err.error.message;
                this.translate.get(`(${error400})`).subscribe(
                    res => {
                        this.swal.callToast(res, 'error');
                    }
                );
                break;

            case 404:
                // console.log(err.error.message, "error");
                console.log("apiNotFound")
                break;

            case 422:
                const error422 = err.error[0] || err.error.message;
                this.translate.get(`(${error422})`).subscribe(
                    res => {
                        this.swal.callToast(res, "error");
                    }
                )
                break;

            case 500:
                this.translate.get("Sorry, something went wrong on our end. Our team has been notified.").subscribe(
                    res => {
                        this.swal.callToast(res, "error");
                    }
                )
                break;

            default:
                this.translate.get("errorStatusNotFound").subscribe(res => {
                    this.swal.callToast(res, "error");
                });
                break;
        }
    }
}