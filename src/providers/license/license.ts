import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import * as _ from 'lodash';

import { License } from '../../app/license';

@Injectable()
export class LicenseProvider {

  constructor(private http: Http) { }

  async getLicenses(): Promise<License[]> {
    const res = await this.http.get('assets/licenses.json').toPromise();
    const licenses: License[] = res.json();
    return _(licenses).groupBy('repository').map(this.licenseFromGroup).value();
  }

  private licenseFromGroup(group: any, repository: string) {
    const license: License = {
      name: _(group).map('name').uniqBy(x => x).join(','),
      description: '',
      licenses: _(group).map('licenses').uniqBy(x => x).join(','),
      repository: repository
    };
    return license;
  }
}
