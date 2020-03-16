import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  fetchEvents(params: any) {
    // tslint:disable-next-line: max-line-length
    return this.http.get('../../events.json?program=JV8sufzvmmy&status=ACTIVE&orgUnit=BKlXSKprcqG&ouMode=DESCENDANTS&startDate=' + params.startDate + '&endDate=' + params.endDate + '&fields=status,dataValues,orgUnit,program,eventDate,event&paging=false').pipe(
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

  updateEvent(eventId: any, data: any, valueToUpdate: any) {
    // tslint:disable-next-line: prefer-const
    const mutedData = this.mapFormattedData(data, valueToUpdate);
    console.log(mutedData);
    return this.http.put('../../events/' + eventId + '.json', mutedData);
  }

  mapPendingEvents(data: any) {
    const mutedArr = [];
    // tslint:disable-next-line: prefer-const
    for (let element of data) {
      const obj = [];
      let pending = false;
      // tslint:disable-next-line: prefer-const
      for (let elm of element.dataValues) {
        if (elm.dataElement === 'NGv5x5xYlbD' && elm.value === 'true') { pending = true; }
        // tslint:disable-next-line: no-string-literal
        if (elm.dataElement === 'B6u9xYMEYW5') { obj['motherName'] = elm.value; }
        // tslint:disable-next-line: no-string-literal
        if (elm.dataElement === 'eVqE49AkPbA') { obj['nbbdId'] = elm.value; }
      }
      if (pending) {
        // tslint:disable-next-line: no-string-literal
        obj['event'] = element;
        mutedArr.push({ ...obj });
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
        // tslint:disable-next-line: no-string-literal
        if(elm.dataElement === 'sSloQt4z2bz') { obj['reason'] = elm.value; }
      }
      if (rejected) {
        mutedArr.push({ ...obj });
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

  mapFormattedData(event: any, value: any) {
    // tslint:disable-next-line: prefer-const
    let mutedDataValues = event.dataValues;

    // tslint:disable-next-line: prefer-const
    // tslint:disable-next-line: forin
    for (let dv in mutedDataValues) {
      if (mutedDataValues[dv].dataElement === 'o6dwSWZPRSD') {
        mutedDataValues[dv].value = value.val;
      }

      if (mutedDataValues[dv].dataElement === 'NGv5x5xYlbD' && value.val === '2') {
        mutedDataValues[dv].value = 'false';
      }
    }

    if (value.val === '2') {
      mutedDataValues.push({
        dataElement: 'sSloQt4z2bz',
        value: value.reason
      });
    }
    // tslint:disable-next-line: no-string-literal
    event['status'] =  value.val === '1' ? 'COMPLETED' : 'ACTIVE';
    return { ...event, dataValues: mutedDataValues };
  }
}
