import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { withInterceptorsFromDi, provideHttpClient, HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app/app-routing.module';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { MessagesModule } from 'primeng/messages';

export function HttpLoaderFactory(http: HttpClient){
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
  }

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, AppRoutingModule, FormsModule, MessagesModule, TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient],
            },
        })),
        provideHttpClient(withInterceptorsFromDi())
    ]
})
  .catch(err => console.error(err));
