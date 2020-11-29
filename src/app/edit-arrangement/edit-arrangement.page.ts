import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { ActivatedRoute } from '@angular/router';
import { Observable, zip } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { Arrangement, Hymn, emptyArrangement, emptyHymn } from '../hymn';

type EditHymn = { hymn: Hymn; arrangement: Arrangement; readonly: boolean };

@Component({
  selector: 'app-edit-arrangement',
  templateUrl: './edit-arrangement.page.html',
  styleUrls: ['./edit-arrangement.page.scss'],
})
export class EditArrangementPage {
  edit$: Observable<EditHymn>;

  constructor(
    private route: ActivatedRoute,
    private db: AngularFireDatabase,
    private auth: AngularFireAuth
  ) {
    this.edit$ = route.paramMap.pipe(
      switchMap((params) =>
        db
          .object<Hymn>(`/hymns/${params.get('hymnKey')}`)
          .valueChanges()
          .pipe(
            map(
              (hymn) =>
                ({
                  hymn: hymn ?? { ...emptyHymn },
                  arrangement: hymn?.arrangements[
                    params.get('arrangementKey')
                  ] ?? { ...emptyArrangement },
                  readonly: !!hymn,
                } as EditHymn)
            )
          )
      )
    );
  }

  save(edit: EditHymn) {
    zip(this.auth.user, this.route.paramMap)
      .pipe(take(1))
      .subscribe(async ([user, params]) => {
        const hymnKey = params.get('hymnKey');

        if (edit.arrangement.user.id === user.uid) {
          // If the user matches, then it must be an existing arrangement.
          await this.db
            .object(
              `/hymns/${hymnKey}/arrangements/${params.get('arrangementKey')}`
            )
            .set(edit.arrangement);
        } else {
          // If the user does not match, then it must be a new arrangement (possibly existing hymn).
          const names = user.displayName.split(' ');
          edit.arrangement.user = {
            id: user.uid,
            name: `${names[0]} ${names[names.length - 1][0]}.`,
          };

          if (hymnKey) {
            await this.db
              .list(`/hymns/${hymnKey}/arrangements`)
              .push(edit.arrangement);
          } else {
            const saved = await this.db.list('/hymns').push(edit.hymn);
            await saved.child('/arrangements').push(edit.arrangement);
          }
        }
      });
  }
}
