import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaskDirective } from '../directives/mask.directive';
import { ContactListComponent } from './contact-list/contact-list.component';
import { LoadingComponent } from './loading/loading.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    MaskDirective,
    ContactListComponent,
    LoadingComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    IonicModule,
  ],
  exports: [
    MaskDirective,
    ContactListComponent,
    LoadingComponent,
  ]
})
export class ComponentsModule { }
