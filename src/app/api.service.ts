import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // tslint:disable-next-line: max-line-length
  private COMPLETED_EVENTS_API = '../../events.json?program=JV8sufzvmmy&status=COMPLETED&orgUnit=BKlXSKprcqG&ouMode=DESCENDANTS&startDate=2020-02-01&endDate=2020-02-10&fields=status,dataValues,orgUnit&paging=false';

  // tslint:disable-next-line: max-line-length
  private PENDING_EVENTS_API = '../../events.json?program=JV8sufzvmmy&status=ACTIVE&orgUnit=BKlXSKprcqG&ouMode=DESCENDANTS&startDate=&endDate=&fields=status,dataValues,orgUnit&paging=false';

  // tslint:disable-next-line: max-line-length
  private ANALYTICS_API = '../../29/analytics/events/query/JV8sufzvmmy.json?startDate=&endDate=&dimension=ou:BKlXSKprcqG&dimension=NGv5x5xYlbD&dimension=B6u9xYMEYW5&dimension=eVqE49AkPbA&stage=Mc1pLiYiX5W&displayProperty=NAME&outputType=EVENT&desc=eventdate&pageSize=100&page=1&outputIdScheme=NAME';
  constructor(private http: HttpClient) { }

  fetchEvents(params: any) {
    // tslint:disable-next-line: max-line-length
    return this.http.get('../../events.json?program=JV8sufzvmmy&status=ACTIVE&orgUnit=BKlXSKprcqG&ouMode=DESCENDANTS&startDate=' + params.startDate + '&endDate=' + params.endDate + '&fields=status,dataValues,orgUnit&paging=false').pipe(
      // tslint:disable-next-line: no-string-literal
      map(res => this.mapPendingEvents(res['events']))
    );
  }

  fetchRejectedEvents(params: any) {
    // tslint:disable-next-line: max-line-length
    return this.http.get('../../events.json?program=JV8sufzvmmy&status=ACTIVE&orgUnit=BKlXSKprcqG&ouMode=DESCENDANTS&startDate=' + params.startDate + '&endDate=' + params.endDate + '&fields=status,dataValues,orgUnit&paging=false').pipe(
      // tslint:disable-next-line: no-string-literal
      map(res => this.mapRejectedEvents(res['events']))
    );
  }

  fetchCompletedEvents(params: any) {
    // tslint:disable-next-line: max-line-length
    return this.http.get('../../events.json?program=JV8sufzvmmy&status=COMPLETED&orgUnit=BKlXSKprcqG&ouMode=DESCENDANTS&startDate=' + params.startDate + '&endDate=' + params.endDate + '&fields=status,dataValues,orgUnit&paging=false').pipe(
      // tslint:disable-next-line: no-string-literal
      map(res => this.mapCompletedEvents(res['events']))
    );
  }

  mapPendingEvents(data: any) {
    const mutedArr = [];
    // tslint:disable-next-line: prefer-const
    for (let element of data) {
      const obj = [];
      let pending = false;
      // tslint:disable-next-line: prefer-const
      for (let elm of element.dataValues) {
        if (elm.dataElement === 'o6dwSWZPRSD' && elm.value === '1') { pending = true; }
        // tslint:disable-next-line: no-string-literal
        if (elm.dataElement === 'B6u9xYMEYW5') { obj['motherName'] = elm.value; }
        // tslint:disable-next-line: no-string-literal
        if (elm.dataElement === 'eVqE49AkPbA') { obj['nbbdId'] = elm.value; }
      }
      if (pending) {
        mutedArr.push(obj);
      }
    }
    return mutedArr;
  }

  mapRejectedEvents(data: any) {
    const mutedArr = [];
    // tslint:disable-next-line: prefer-const
    for (let element of data) {
      const obj = [];
      let rejected = false;
      // tslint:disable-next-line: prefer-const
      for (let elm of element.dataValues) {
        if (elm.dataElement === 'o6dwSWZPRSD' && elm.value === '2') { rejected = true; }
        // tslint:disable-next-line: no-string-literal
        if (elm.dataElement === 'B6u9xYMEYW5') { obj['motherName'] = elm.value; }
        // tslint:disable-next-line: no-string-literal
        if (elm.dataElement === 'eVqE49AkPbA') { obj['nbbdId'] = elm.value; }
      }
      if (rejected) {
        mutedArr.push(obj);
      }
    }
    return mutedArr;
  }

  mapCompletedEvents(data: any) {
    const mutedArr = [];
    // tslint:disable-next-line: prefer-const
    for (let element of data) {
      const obj = [];
      // tslint:disable-next-line: prefer-const
      for (let elm of element.dataValues) {
        // tslint:disable-next-line: no-string-literal
        if (elm.dataElement === 'B6u9xYMEYW5') { obj['motherName'] = elm.value; }
        // tslint:disable-next-line: no-string-literal
        if (elm.dataElement === 'eVqE49AkPbA') { obj['nbbdId'] = elm.value; }
      }
      mutedArr.push({ ...obj, status: 'Approved' });
    }
    return mutedArr;
  }
}
