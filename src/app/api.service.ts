import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  fetchEvents(params: any, ou) {
    // tslint:disable-next-line: max-line-length
    return this.http.get('../../events.json?program=JV8sufzvmmy&status=ACTIVE&orgUnit=' + ou.id + '&ouMode=DESCENDANTS&startDate=' + params.startDate + '&endDate=' + params.endDate + '&fields=status,dataValues,orgUnit,program,eventDate,event&paging=false').pipe(
      // tslint:disable-next-line: no-string-literal
      map(res => this.mapPendingEvents(res['events'])),
      // switchMap( data => this.fetchOrgUnitPath(data))
    );
  }

  fetchRejectedEvents(params: any, ou) {
    // tslint:disable-next-line: max-line-length
    return this.http.get('../../events.json?program=JV8sufzvmmy&status=ACTIVE&orgUnit=' + ou.id + '&ouMode=DESCENDANTS&startDate=' + params.startDate + '&endDate=' + params.endDate + '&fields=status,dataValues,orgUnit,program,eventDate,event&paging=false').pipe(
      // tslint:disable-next-line: no-string-literal
      map(res => this.mapRejectedEvents(res['events']))
    );
  }

  fetchCompletedEvents(params: any, ou) {
    // tslint:disable-next-line: max-line-length
    return this.http.get('../../events.json?program=JV8sufzvmmy&status=COMPLETED&orgUnit=' + ou.id + '&ouMode=DESCENDANTS&startDate=' + params.startDate + '&endDate=' + params.endDate + '&fields=status,dataValues,orgUnit,program,eventDate,event&paging=false').pipe(
      // tslint:disable-next-line: no-string-literal
      map(res => this.mapCompletedEvents(res['events']))
    );
  }

  fetchLoggedInUserData() {
    return this.http.get('../../me.json?fields=organisationUnits[id,displayName]').pipe(
      map(res => {
        return {
          id: res['organisationUnits'][0].id,
          name: res['organisationUnits'][0].displayName
        };
      })
    );
  }

  // fetchOrgUnitData() {
  //   return this.http.get('../../me.json?fields=organisationUnits[id,displayName]').pipe(
  //     map(res => this.mapOrgunitData(res))
  //   );
  // }

  fetchOrgUnitPath(data) {
    // console.log(data);
    // tslint:disable-next-line: prefer-const
    let ouid = data.event.orgUnit;
    return this.http.get('../../organisationUnits/' + ouid + '.json?fields=ancestors[id,displayName],id,path,displayName').pipe(
      map(res => this.mapOus(res))
    );
  }

  updateEvent(eventId: any, data: any, valueToUpdate: any) {
    // tslint:disable-next-line: prefer-const
    const mutedData = this.mapFormattedData(data, valueToUpdate);
    // console.log(mutedData);
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
        if (elm.dataElement === 'sSloQt4z2bz') { obj['reason'] = elm.value; }
      }
      if (rejected) {
        obj['event'] = element;
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
      obj['event'] = element;
      mutedArr.push({ ...obj, status: 'Approved' });
    }
    return mutedArr;
  }

  mapFormattedData(event: any, value: any) {
    // tslint:disable-next-line: prefer-const
    let mutedDataValues = event.dataValues;

    // tslint:disable-next-line: forin
    for (let dv in mutedDataValues) {
      if (mutedDataValues[dv].dataElement === 'o6dwSWZPRSD') {
        mutedDataValues[dv].value = value.val;
      }

      if (mutedDataValues[dv].dataElement === 'sSloQt4z2bz') {
        mutedDataValues[dv].value = value.val === '2' ? value.reason : '';
      }

      if (mutedDataValues[dv].dataElement === 'NGv5x5xYlbD') {
        mutedDataValues[dv].value = 'false';
      }
    }

    const payload = [
      {
        dataElement: 'sSloQt4z2bz',
        value: value.val === '2' ? value.reason : ''
      },
      {
        dataElement: 'o6dwSWZPRSD',
        value: value.val
      },
      {
        dataElement: 'NGv5x5xYlbD',
        value: 'false'
      }
    ];

    mutedDataValues = [...mutedDataValues, ...payload];
    // tslint:disable-next-line: no-string-literal
    event['status'] = value.val === '1' ? 'COMPLETED' : 'ACTIVE';
    return { ...event, dataValues: mutedDataValues };
  }

  mapOus(data) {
    // tslint:disable-next-line: prefer-const
    let ous = [];
    // tslint:disable-next-line: prefer-const
    for (let e of data.ancestors) {
      ous[e.id] = e.displayName;
    }
    ous[data.id] = data.displayName;

    return data.path.split('/').map((a) => ous[a]).join('/');
  }
}
