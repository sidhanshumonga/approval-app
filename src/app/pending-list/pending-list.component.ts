import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { MatDatepickerInputEvent, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { RejectionPopupComponent } from '../rejection-popup/rejection-popup.component';
import { ApiService } from '../api.service';
import { Store } from '@ngrx/store';
import * as RootReducer from '../app.reducers';

@Component({
  selector: 'app-pending-list',
  templateUrl: './pending-list.component.html',
  styleUrls: ['./pending-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PendingListComponent implements OnInit {
  displayedColumns: string[] = ['nbbdId', 'motherName', 'action'];
  dataSource = new MatTableDataSource();
  public events: any;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(public store: Store<RootReducer.State>, public dialog: MatDialog, public apiService: ApiService) {
    this.store.select(state => state.pendingList).subscribe(data => {
      if (data.list) {
        this.dataSource = new MatTableDataSource(data.list);
      }
    });
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

  updateStatus(value: string) {
    if (value === 'reject') {
      this.openDialog();
    }
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(RejectionPopupComponent, {
      width: '40%',
      height: 'auto'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
