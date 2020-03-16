import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PendingListComponent } from './pending-list/pending-list.component';
import { ApprovedListComponent } from './approved-list/approved-list.component';
import { RejectedListComponent } from './rejected-list/rejected-list.component';

const routes: Routes = [
  { path: '', component: PendingListComponent },
  { path: 'home', component: HomeComponent },
  { path: 'pending-approvals', component: PendingListComponent },
  { path: 'approved-list', component: ApprovedListComponent },
  { path: 'rejected-list', component: RejectedListComponent },
  // { path: '', redirectTo: '/pending-approvals', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
