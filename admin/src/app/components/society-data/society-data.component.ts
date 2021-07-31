import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DashboardService } from 'src/app/services/dashboard.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-society-data',
  templateUrl: './society-data.component.html',
  styleUrls: ['./society-data.component.scss']
})
export class SocietyDataComponent implements OnInit {
  soc: any;
  datasource:any;
  displayedColumns: string[] = ['Products', 'Quantity'];
  dataSource;
  panelOpenState = false;

  constructor(private society:DashboardService,private spinner: NgxSpinnerService,) { }

  ngOnInit(): void {
    this.society.society().subscribe(data=>{
      this.soc = data
      console.log(data);
    })
  }
  search = new FormGroup({
    society: new FormControl,
  })
  onSearch(){
    this.spinner.show()
    this.society.analytics(this.search.value).subscribe(info=>{
      this.datasource=info
      console.log(info)
      this.dataSource = this.datasource;
      setTimeout(() => {
        /** spinner ends after 3 seconds */
        this.spinner.hide();
      }, 3000);
    },err=>{
      setTimeout(() => {
        /** spinner ends after 3 seconds */
        this.spinner.hide();
      }, 3000);
    })
  }

}
