<div align="center">
<img width="120" style="padding-top: 50px; margin: 0;" src="http://47.104.180.148/go-captcha/gocaptcha_logo.svg?v=1"/>
<h1 style="margin: 0; padding: 0">Go Captcha</h1>
<p>Behavior Captcha Of Angular</p>

<a href="https://github.com/wenlng/go-captcha-angular/releases"><img src="https://img.shields.io/github/v/release/wenlng/go-captcha-angular.svg"/></a>
<a href="https://www.npmjs.com/package/go-captcha-angular"><img src="https://img.shields.io/npm/v/go-captcha-angular"/></a>
<a href="https://github.com/wenlng/go-captcha-angular/blob/LICENSE"><img src="https://img.shields.io/badge/License-MIT-green.svg"/></a>
<a href="https://github.com/wenlng/go-captcha-angular"><img src="https://img.shields.io/github/stars/wenlng/go-captcha-angular.svg"/></a>
<a href="https://github.com/wenlng/go-captcha-angular"><img src="https://img.shields.io/github/last-commit/wenlng/go-captcha-angular.svg"/></a>

</div>

<br/>

> English | [中文](README_zh.md)

<br/>

<p> ⭐️ If it helps you, please give a star.</p>

<img src="https://github.com/wenlng/git-assets/blob/master/go-captcha/go-captcha-v2.jpg?raw=true" alt="Poster">


## Install
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

<br/>

## Click Mode
```angular2html
<go-captcha-click
  [config]="{}"
  [data]="{}"
  [events]="{}"
  #domRef
/>

<script>
  class Demo {
    // call methods
    @ViewChild('domRef') domRef;
    test(){
      this.domRef?.clear()
      this.domRef?.refresh()
    }
  }
</script>
```


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
  iconSize?: number;
  dotSize?: number;
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
  confirm?: (dots: Array<ClickDot>, reset:() => void) => boolean;
}

// export component method
interface ExportMethods {
  reset: () => void,
  clear: () => void,
  refresh: () => void,
  close: () => void,
}
```

## Slide Mode
```angular2html
<go-captcha-slide
  [config]="{}"
  [data]="{}"
  [events]="{}"
  #domRef
/>

<script>
  class Demo {
    // call methods
    @ViewChild('domRef') domRef;
    test(){
      this.domRef?.clear()
      this.domRef?.refresh()
    }
  }
</script>
```


```ts
// config = {}
interface SlideConfig {
  width?: number;
  height?: number;
  thumbWidth?: number;
  thumbHeight?: number;
  verticalPadding?: number;
  horizontalPadding?: number;
  showTheme?: boolean;
  title?: string;
  iconSize?: number;
  scope ?: boolean;
}

// data = {}
interface SlideData {
  thumbX: number;
  thumbY: number;
  thumbWidth: number;
  thumbHeight: number;
  image: string;
  thumb: string;
}

// events = {}
interface SlideEvents {
  move?: (x: number, y: number) => void;
  refresh?: () => void;
  close?: () => void;
  confirm?: (point: SlidePoint, reset:() => void) => boolean;
}

// export component method
interface ExportMethods {
  reset: () => void,
  clear: () => void,
  refresh: () => void,
  close: () => void,
}
```

## Drag-And-Drop Mode
```angular2html
<go-captcha-slide-region
  [config]="{}"
  [data]="{}"
  [events]="{}"
  #domRef
/>

<script>
  class Demo {
    // call methods
    @ViewChild('domRef') domRef;
    test(){
      this.domRef?.clear()
      this.domRef?.refresh()
    }
  }
</script>
```

```ts
// config = {}
interface SlideRegionConfig {
  width?: number;
  height?: number;
  thumbWidth?: number;
  thumbHeight?: number;
  verticalPadding?: number;
  horizontalPadding?: number;
  showTheme?: boolean;
  title?: string;
  iconSize?: number;
  scope ?: boolean;
}

// data = {}
interface SlideRegionData {
  thumbX: number;
  thumbY: number;
  thumbWidth: number;
  thumbHeight: number;
  image: string;
  thumb: string;
}

// events = {}
interface SlideRegionEvents {
  move?: (x: number, y: number) => void;
  refresh?: () => void;
  close?: () => void;
  confirm?: (point: SlideRegionPoint, reset:() => void) => boolean;
}

// export component method
interface ExportMethods {
  reset: () => void,
  clear: () => void,
  refresh: () => void,
  close: () => void,
}
```

## Rotation Mode
```angular2html
<go-captcha-rotate
  [config]="{}"
  [data]="{}"
  [events]="{}"
  #domRef
/>

<script>
  class Demo {
    // call methods
    @ViewChild('domRef') domRef;
    test(){
      this.domRef?.clear()
      this.domRef?.refresh()
    }
  }
</script>
```


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
  iconSize?: number;
  scope ?: boolean;
}

// data = {}
interface RotateData {
  image: string;
  thumb: string;
  thumbSize: number;
}

// events = {}
interface RotateEvents {
  rotate?: (angle: number) => void;
  refresh?: () => void;
  close?: () => void;
  confirm?: (angle: number, reset:() => void) => boolean;
}

// export component method
interface ExportMethods {
  reset: () => void,
  clear: () => void,
  refresh: () => void,
  close: () => void,
}
```


## Button
```jsx
<go-captcha-button />
```


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
