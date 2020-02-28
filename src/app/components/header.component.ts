/*
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
        name: 'ADVERTISEMENT',
        link: 'advertisement',
        class: 'icon icon-buysellads blue-text s-18'
      },
   /!*   {
        name: 'APPLICATION',
        link: 'application',
        class: 'icon icon-buysellads blue-text s-18'
      },
      {
        name: 'APPLICATION HOST',
        link: 'host',
        class: 'icon icon-buysellads blue-text s-18'
      },*!/
      /!*{
        name: 'APPLICATION KEY',
        link: 'application-key',
        class: 'icon icon-buysellads blue-text s-18'
      },*!/
    ];
  }
}
*/


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
        name : 'APPLICATION',
        link : '/',
        class : 'icon icon-buysellads blue-text s-18',
      },
      {
        name: 'TRASH',
        link: '/trash',
        class: 'icon icon-trash blue-text s-18'
      },
    ];
  }
}
