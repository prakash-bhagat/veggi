import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-confirmation-with-data',
  templateUrl: './confirmation-with-data.component.html',
  styleUrls: ['./confirmation-with-data.component.scss']
})
export class ConfirmationWithDataComponent implements OnInit {
list;
id:FormGroup;
  constructor(public dialogRef: MatDialogRef<ConfirmationWithDataComponent>,
    private employee:EmployeeService,private fb:FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.employee.list().subscribe(list=>{
      this.list =list;
      console.log(this.list)

      // this.assign.controls['name'].setValue(this.employeelist.name); 
    });
    // this.id = this.fb.group({
    //   order_id:['']
    // })
  }
  // onSubmit(){
  //   console.log(this.id.value);
  // }
  public confirmMessage:string;
}
