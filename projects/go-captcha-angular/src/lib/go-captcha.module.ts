import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {BtnDefaultIconComponent} from "./icons/btn-default-icon.component";
import {ArrowsIconComponent} from "./icons/arrows-icon.component";
import {BtnErrorIconComponent} from "./icons/btn-error-icon.component";
import {BtnSuccessIconComponent} from "./icons/btn-success-icon.component";
import {BtnWarnIconComponent} from "./icons/btn-warn-icon.component";
import {CloseIconComponent} from "./icons/close-icon.component";
import {RefreshIconComponent} from "./icons/refresh-icon.component";
import {LoadingIconComponent} from "./icons/loading-icon.component";

import {ClickComponent} from './modules/click/click.component';
import {SlideComponent} from './modules/slide/slide.component';
import {SlideRegionComponent} from './modules/slide-region/slide-region.component';
import {RotateComponent} from './modules/rotate/rotate.component';

import {ButtonComponent} from "./modules/button/button.component";

@NgModule({
    imports: [CommonModule],
    declarations: [
        ClickComponent,
        SlideComponent,
        RotateComponent,
        SlideRegionComponent,
        ButtonComponent,
        // icons component
        ArrowsIconComponent,
        BtnDefaultIconComponent,
        BtnErrorIconComponent,
        BtnWarnIconComponent,
        BtnSuccessIconComponent,
        CloseIconComponent,
        RefreshIconComponent,
        LoadingIconComponent,
    ],
    providers: [],
    exports: [
        ClickComponent,
        SlideComponent,
        SlideRegionComponent,
        RotateComponent,
        ButtonComponent
    ],
})
export class GoCaptchaModule { }
