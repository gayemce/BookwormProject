import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SelectedLanguageService } from 'src/app/services/selected-language.service';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css'],
    standalone: true,
    imports: [TranslateModule]
})
export class FooterComponent {

    constructor(
        public selectedLang: SelectedLanguageService
    ){}
}
