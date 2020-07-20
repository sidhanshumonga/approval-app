import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import * as constants from './CONSTANTS';
import * as RootReducer from './app.reducers';
import { Store } from '@ngrx/store';
import * as CommonActions from './common/state/common.actions'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'NBBD Approval app';

  constructor(@Inject(DOCUMENT) private document: any, private store: Store<RootReducer.State>) {
    store.dispatch(new CommonActions.FetchRootOrgunitRequest());
   }

  goToHome() {
    const base = constants.BASE_URL;
    const dashboard = constants.DHIS_DASHBOARD;
    this.document.location.assign(base + dashboard);
  }
}
