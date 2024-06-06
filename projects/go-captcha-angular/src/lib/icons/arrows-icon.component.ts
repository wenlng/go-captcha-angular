import {Component, Input} from '@angular/core';

@Component({
  selector: 'arrows-icon',
  template: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" [attr.width]="width" [attr.height]="height">
      <path d="M131.6,116.3c0,0-75.6,0-109.7,0c-9.1,0-16.2-7.4-16.2-16.2c0-9.1,7.4-16.2,16.2-16.2c28.7,0,109.7,0,109.7,0
\ts-5.4-5.4-30.4-30.7c-6.4-6.4-6.4-16.7,0-23.1s16.7-6.4,23.1,0l58.4,58.4c6.4,6.4,6.4,16.7,0,23.1c0,0-32.9,32.9-57.9,57.9
\tc-6.4,6.4-16.7,6.4-23.1,0c-6.4-6.4-6.4-16.7,0-23.1C121.8,126.2,131.6,116.3,131.6,116.3z"/>
    </svg>`,
})
export class ArrowsIconComponent {
  @Input()
  width = 20

  @Input()
  height = 20
}
