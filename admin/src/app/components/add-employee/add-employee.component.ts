import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {

  constructor(private addemp:EmployeeService,private toast:ToastrService,private router:Router) { }

  ngOnInit(): void {
  }
  onSubmit(){
    console.log(this.addEmployee.value)
    this.addemp.add(this.addEmployee.value).subscribe(data=>{
      this.toast.success("Employee Added")
      this.router.navigateByUrl('/allemployee')
    },error=>{this.toast.error("Employee Not Added")})
    //console.log(this.addEmployee.value);
    this.addEmployee.reset();
  }
  addEmployee= new FormGroup({
    name: new FormControl('',Validators.required),
    mobile: new FormControl('',[Validators.minLength(10),Validators.maxLength(10)]),
    address: new FormControl('',Validators.required),
    password: new FormControl('',Validators.minLength(6))

  })

}
