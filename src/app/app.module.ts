import { NgModule, ErrorHandler } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { UserPage } from '../pages/user/user';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { HymnPage } from '../pages/hymn/hymn';
import { StopsPage } from '../pages/stops/stops';
import { CreateHymnPage } from '../pages/create-hymn/create-hymn';
import { EditStopsPage } from '../pages/edit-stops/edit-stops';
import { PipesModule } from '../pipes/pipes.module';

import config from './config';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    UserPage,
    HomePage,
    TabsPage,
    HymnPage,
    StopsPage,
    CreateHymnPage,
    EditStopsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    UserPage,
    HomePage,
    TabsPage,
    HymnPage,
    StopsPage,
    CreateHymnPage,
    EditStopsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
