import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatSnackBarModule} from '@angular/material/snack-bar';



@NgModule({
  declarations: [],
  imports: [
    MatExpansionModule,MatInputModule,MatIconModule,MatButtonModule,
    MatMenuModule,MatSnackBarModule
  ],
  exports:[
    MatExpansionModule,MatInputModule,MatIconModule,MatButtonModule,
    MatMenuModule,MatSnackBarModule
  ]
})
export class MaterialModule { }
