import { Component, OnInit } from '@angular/core';
import { UserOrdersService } from '../../services/user-orders.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  id: any;
  chk: any;

  constructor(private uo:UserOrdersService) { }

  ngOnInit(): void {
    
  }
  // login(form: NgForm) {
  //   this.uo.usersorders(this.id).subscribe(data=>{
  //     this.chk = data
  //     console.log(data);
  //     form.reset();
  //   })
  // }

}
