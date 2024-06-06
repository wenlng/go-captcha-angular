import {Component, Input} from '@angular/core';

@Component({
  selector: 'btn-default-icon',
  template: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" [attr.width]="width" [attr.height]="height">
      <circle fill="#3E7CFF" cx="100" cy="100" r="96.3"/>
      <path fill="#FFFFFF" d="M140.8,64.4l-39.6-11.9h-2.4L59.2,64.4c-1.6,0.8-2.8,2.4-2.8,4v24.1c0,25.3,15.8,45.9,42.3,54.6
\tc0.4,0,0.8,0.4,1.2,0.4c0.4,0,0.8,0,1.2-0.4c26.5-8.7,42.3-28.9,42.3-54.6V68.3C143.5,66.8,142.3,65.2,140.8,64.4z"/>
    </svg>`,
})
export class BtnDefaultIconComponent {
  @Input()
  width = 20

  @Input()
  height = 20
}
