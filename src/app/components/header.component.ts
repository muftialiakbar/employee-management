import { Component, OnInit } from '@angular/core';

@Component({
  selector : 'cs-header',
  templateUrl : './header.component.html',
  styleUrls : [
    '../styles/header.component.scss'
  ]
})
export class HeaderComponent implements OnInit {
  menus = [];
  ngOnInit() {
    this.menus = [
      {
        name : 'Home',
        link : '../dashboard',
        class : 'icon icon-home blue-text s-18',
      },
      {
        name: 'GROUP',
        link: 'group',
        class: 'icon icon-users blue-text s-18'
      },
      {
        name: 'ADVERTISEMENT',
        link: 'advertisement',
        class: 'icon icon-buysellads blue-text s-18'
      },
    ];
  }
}
