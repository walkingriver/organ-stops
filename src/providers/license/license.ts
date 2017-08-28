import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import * as _ from 'lodash';

import { License } from '../../app/license';

@Injectable()
export class LicenseProvider {
  licenseUrls = {
    'Apache': 'x',
    'Apache-2.0': 'x',
    'BSD': 'x',
    'BSD-2-Clause': 'x',
    'BSD-3-Clause': 'x',
    'ISC': 'x',
    'LGPL': 'x',
    'MIT': 'x'
  };

  constructor(private http: Http) { }

  async getLicenses(): Promise<License[]> {
    const res = await this.http.get('assets/licenses.json').toPromise();
    const licenses: License[] = res.json();
    return _(licenses)
      .map(license => {
        license.licenses = license.licenses.replace('*', '').replace('BSD-3-Clause OR ', '');
        return license;
      })
      .filter(license => this.licenseUrls[license.licenses])
      .groupBy('repository')
      .map(this.licenseFromGroup)
      .value();
  }

  private licenseFromGroup(group: any, repository: string) {
    const license: License = {
      name: _(group).map('name').uniqBy(x => x).value(),
      description: _(group).map('description').value(),
      licenses: _(group).map('licenses').uniqBy(x => x).join(','),
      repository: repository
    };
    return license;
  }
}
