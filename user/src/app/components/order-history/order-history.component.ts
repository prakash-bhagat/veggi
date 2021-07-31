import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HistoryService } from '@app/services/history.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {
  
  myUser:any;
  userId:number;
  panelOpenState = false;
  test:any;
  dataSource:any;
  constructor(private history:HistoryService,
    private spinner: NgxSpinnerService,private toast:ToastrService) { }
  displayedColumns: string[] = ['id', 'quantityOrdered', 'price','title'];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  ngOnInit(): void {
    this.getid()
    const data={userId:this.myUser.id};
    
    this.history.getOrder(data).subscribe((data:any)=>{
      this.spinner.show();
      this.dataSource=data
      setTimeout(() => {
        this.spinner.hide();
      }, 1000);
      this.test =data
    },err=>{this.toast.error("Error while fetching")
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  })
  }
getid(){
  this.myUser = JSON.parse(localStorage.getItem('access_token'));
}
}
