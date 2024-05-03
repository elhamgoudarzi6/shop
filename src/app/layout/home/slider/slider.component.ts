import { Component, OnInit } from '@angular/core';
import { PrimengListModule } from '../../../primeng-list.module';
import { MessageService } from 'primeng/api';
import { LayoutService } from '../../layout.service';
import { TokenService } from '../../../auth/token.service';
import { LocalStorageService } from '../../../auth/local-storage.service';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [PrimengListModule],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss',
  providers: [MessageService]
})
export class HeroComponent implements OnInit {
  images: any[] = [];
  responsiveOptions: any[] | any;
  items=[
    {id:0,image:"../../../../assets/images/pic1.jpg",title:"گوشی آیفن 12",price:3000000},
    {id:1,image:"../../../../assets/images/pic2.jpg",title:"گوشی آیفن 12",price:3000000},
    {id:2,image:"../../../../assets/images/pic3.jpg",title:"گوشی آیفن 12",price:3000000},
  ]
  constructor(
    private messageService: MessageService,
    private service: LayoutService,
    private token: TokenService,
    private localStorage: LocalStorageService,
  ) {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 1,
        numScroll: 1,
      },
      {
        breakpoint: '992px',
        numVisible: 1,
        numScroll: 1,
      },
      {
        breakpoint: '768px',
        numVisible: 1,
        numScroll: 1
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }


  ngOnInit(): void {
    this.getSlider();
  }

  getSlider() {
    this.service.getSlider().subscribe((response: any) => {
      if (response.success === true) {
        this.images = response.data;
      } else {
        this.token.checkTokenExamination(response.data, 'admin');
        this.messageService.add({
          severity: 'error',
          summary: ' دریافت اطلاعات ',
          detail: response.data,
        });
      }
    });
  }

}

