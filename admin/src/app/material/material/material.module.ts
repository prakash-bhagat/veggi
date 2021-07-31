import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatMenuModule} from '@angular/material/menu';
import {MatTableModule,MatTableDataSource} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatPaginatorModule} from '@angular/material/paginator';




@NgModule({
 imports: [
  MatToolbarModule,MatIconModule,MatCardModule,MatSidenavModule,MatExpansionModule,MatMenuModule,
  MatTableModule,MatFormFieldModule,MatDialogModule,MatButtonModule,MatSelectModule,MatPaginatorModule,
  // MatTableDataSource,
],
  exports:[
    MatToolbarModule,MatIconModule,MatCardModule,MatSidenavModule,MatExpansionModule,MatMenuModule,
    MatTableModule,MatFormFieldModule,MatDialogModule,MatButtonModule,MatSelectModule,MatPaginatorModule,
    // MatTableDataSource,
  ]
  
})
export class MaterialModule { }
