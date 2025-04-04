import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RefundComponent } from './refund.component';

const routes: Routes = [
  { path: '', component: RefundComponent }
];

@NgModule({
  declarations: [RefundComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class RefundModule { } 