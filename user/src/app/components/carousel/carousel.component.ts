import { Component, OnInit } from '@angular/core';
import { CarouselService } from '@app/services/carousel.service';
import { environment } from 'src/environments/environment';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  providers: [NgbCarouselConfig]
})
export class CarouselComponent implements OnInit {
  carouselImage;
  carouselURL=environment.IMAGE_URL;
  constructor(private carousel: CarouselService,config: NgbCarouselConfig) {
    config.interval = 10000;
    config.wrap = true;
    config.keyboard = false;
    config.pauseOnHover = false;
   }

  ngOnInit(): void {
    this.carousel.getCarousel().subscribe(data=>{
      this.carouselImage=data
      // console.log("data",data);
    })
  }

}
