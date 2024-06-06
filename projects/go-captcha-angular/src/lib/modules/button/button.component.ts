import {Component, Input, OnInit} from '@angular/core';
import {ButtonType, ButtonConfig, defaultButtonConfig} from "./button-instance";

@Component({
  selector: 'go-captcha-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input()
  config?: ButtonConfig = defaultButtonConfig()
  @Input()
  clickEvent?: (e: Event) => void;
  @Input()
  disabled?: boolean = false
  @Input()
  type?: ButtonType = "default"
  @Input()
  title?: string = "点击按键进行验证"

  ngOnInit() {
    this.config = {...defaultButtonConfig(), ...this.config}
  }

  handleClick(e) {
    this.clickEvent && this.clickEvent(e)
  }
}
