import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { PdfComponent } from './component/pdf/pdf.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { environment } from 'src/environments/environment';
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import { UserService } from './user.service';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PdfComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    NgxExtendedPdfViewerModule,

  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
