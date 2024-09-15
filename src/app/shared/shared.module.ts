import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CamelToTitlePipe } from './pipes/camel-to-title.pipe';



@NgModule({
  declarations: [
    CamelToTitlePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CamelToTitlePipe
  ]
})
export class SharedModule { }
