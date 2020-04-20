import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import * as constants from './CONSTANTS';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'NBBD Approval app';

  constructor(@Inject(DOCUMENT) private document: any) { }

  goToHome() {
    const base = constants.BASE_URL;
    const dashboard = constants.DHIS_DASHBOARD;
    this.document.location.assign(base + dashboard);
  }
}
