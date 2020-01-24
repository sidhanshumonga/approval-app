import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-leftbar',
  templateUrl: './leftbar.component.html',
  styleUrls: ['./leftbar.component.scss']
})
export class LeftbarComponent implements OnInit {

  selected = 'pending';
  constructor() { }

  ngOnInit() {
  }

  navigate(nav: string) {
    this.selected = nav;
  }

}
