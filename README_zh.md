<div align="center">
<img width="120" style="padding-top: 50px; margin: 0;" src="http://47.104.180.148/go-captcha/gocaptcha_logo.svg?v=1"/>
<h1 style="margin: 0; padding: 0">Go Captcha</h1>
<p>Angular 行为验证码</p>
</div>

<br/>

> [English](README.md) | 中文

<br/>

<p style="text-align: center"> ⭐️ 如果能帮助到你，请随手给点一个star</p>
<p style="text-align: center">QQ交流群：178498936</p>

<img src="http://47.104.180.148/go-captcha/go-captcha-v2.jpg" alt="Poster">

<br/>

## 安装
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

## 点选式
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

## 滑动式
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

## 拖拽式
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

## 旋转式
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
  angle: number;
  image: string;
  thumb: string;
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


## 按钮
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

## 👍 赞助一下
<div>
<a href="http://gocaptcha.wencodes.com/sponsor/" target="_blank">http://gocaptcha.wencodes.com/sponsor/</a>
</div>
<br/>