# Go Captcha Angular Package

```shell
yarn add go-captcha-angular
# or
npm install go-captcha-angular
# or
pnpm install go-captcha-angular
```

angular.json
```json
{
  // ....
  "projects": {
    "xxxx": {
      // ...
      "architect": {
        "build": {
          "options": {
            "styles": [
              "go-captcha-angular/css/go-captcha.css"
            ]
          }
        }
      }
    }
  }
}
```


app.module.ts
```ts
import { GoCaptchaModule } from 'go-captcha-angular';
@NgModule({
  // ...
  imports: [
    GoCaptchaModule,
  ],
  // ...
})
export class AppModule { }
```


## 🖖 Click Mode Captcha
```angular2html
import GoCaptcha from 'go-captcha-angular';

<GoCaptcha.Click
  [config]="{}"
  [data]="{}"
  [events]="{}"
/>
```

### Parameter Reference
```ts
// config = {}
interface ClickConfig {
  width?: number;
  height?: number;
  thumbWidth?: number;
  thumbHeight?: number;
  verticalPadding?: number;
  horizontalPadding?: number;
  showTheme?: boolean;
  title?: string;
  buttonText?: string;
}

// data = {}
interface ClickData {
  image: string;
  thumb: string;
}

// events = {}
interface ClickEvents {
  click?: (x: number, y: number) => void;
  refresh?: () => void;
  close?: () => void;
  confirm?: (dots: Array<ClickDot>) => boolean;
}
```

## 🖖 Slide Mode Captcha
```angular2html
import GoCaptcha from 'go-captcha-angular';

<GoCaptcha.Slide
  [config]="{}"
  [data]="{}"
  [events]="{}"
/>

<GoCaptcha.SlideRegion
  [config]="{}"
  [data]="{}"
  [events]="{}"
/>
```
### Parameter Reference
```ts
// config = {}
interface SlidConfig {
  width?: number;
  height?: number;
  thumbWidth?: number;
  thumbHeight?: number;
  verticalPadding?: number;
  horizontalPadding?: number;
  showTheme?: boolean;
  title?: string;
}

// data = {}
interface SlidData {
  thumbX: number;
  thumbY: number;
  thumbWidth: number;
  thumbHeight: number;
  image: string;
  thumb: string;
}

// events = {}
interface SlidEvents {
  move?: (x: number, y: number) => void;
  refresh?: () => void;
  close?: () => void;
  confirm?: (point: SlidPoint) => boolean;
}
```
```ts
// config = {}
interface SlidRegionConfig {
  width?: number;
  height?: number;
  thumbWidth?: number;
  thumbHeight?: number;
  verticalPadding?: number;
  horizontalPadding?: number;
  showTheme?: boolean;
  title?: string;
}

// data = {}
interface SlidRegionData {
  thumbX: number;
  thumbY: number;
  thumbWidth: number;
  thumbHeight: number;
  image: string;
  thumb: string;
}

// events = {}
interface SlidRegionEvents {
  move?: (x: number, y: number) => void;
  refresh?: () => void;
  close?: () => void;
  confirm?: (point: SlidRegionPoint) => boolean;
}
```

## 🖖 Rotate Mode Captcha
```angular2html
import GoCaptcha from 'go-captcha-angular';

<GoCaptcha.Rotate
  [config]="{}"
  [data]="{}"
  [events]="{}"
/>
```

### Parameter Reference
```ts
// config = {}
interface RotateConfig {
  width?: number;
  height?: number;
  thumbWidth?: number;
  thumbHeight?: number;
  verticalPadding?: number;
  horizontalPadding?: number;
  showTheme?: boolean;
  title?: string;
}

// data = {}
interface RotateData {
  angle: number;
  image: string;
  thumb: string;
}

// events = {}
interface RotateEvents {
  rotate?: (angle: number) => void;
  refresh?: () => void;
  close?: () => void;
  confirm?: (angle: number) => boolean;
}
```


## 🖖 Button
```jsx
import GoCaptcha from 'go-captcha-angular';

<GoCaptcha.Button />
```

### Parameter Reference
```ts
interface _ {
  config?: ButtonConfig;
  clickEvent?: () => void;
  disabled?: boolean;
  type?: "default" | "warn" | "error" | "success";
  title?: string;
}

export interface ButtonConfig {
  width?: number;
  height?: number;
  verticalPadding?: number;
  horizontalPadding?: number;
}
```