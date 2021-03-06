import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ContactAddPage } from './contact-add.page';
import { MaskDirective } from 'src/app/directives/mask.directive';
import { ComponentsModule } from 'src/app/components/components.module';

const routes: Routes = [
  {
    path: '',
    component: ContactAddPage
  }
];

@NgModule({
  imports: [  
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ContactAddPage]
})
export class ContactAddPageModule {}
