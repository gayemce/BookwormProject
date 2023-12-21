import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";

@Injectable({
    providedIn: 'root'
})

export class ErrorService {

    constructor(
        private router: Router,
        private translate: TranslateService,
        // private message: MessageService
    ) { }

    errorHandler(err: HttpErrorResponse) {
        console.log(err);

        switch (err.status) {
            case 0:
                this.translate.get("apiNotAvailable").subscribe(res => {
                    console.log(res, "error");
                });
                break;

            case 400:
                console.log(err.error.message, "error");
                break;

            case 404:
                this.translate.get("apiNotFound").subscribe(res => {
                    console.log(res, "error");
                });
                break;
                
            case 422:
                for (let e of err.error)
                    console.log(e, "Validation Error")
                break;

            case 500:
                console.log(err.error.message, "error");
                break;

            default:
                this.translate.get("errorStatusNotFound").subscribe(res => {
                    console.log(res, "error")
                });
                break;
        }
    }
}