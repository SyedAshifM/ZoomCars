import { Component , OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

popularCars:any[]=[];

locations:any[]=[];

fromLocation :string='';
toLocation: string='';


constructor(
  private carSrv:CarService,
  private router: Router
  ){}

  ngOnInit(): void { 
     this.GetAllCars()
     this.GetAllLocations()
 }

  GetAllCars(){
    this.carSrv.GetAllCars().subscribe((res:any)=>{
      this.popularCars = res.data;
    })
  }

  GetAllLocations(){
    this.carSrv.GetAllLocations().subscribe((res:any)=>{
      this.locations = res.data;
    })
  }

  navigateToSearchPage(){
    this.router.navigate(['/search', this.fromLocation])
  }

  makeBooking(carId:number) {
    this.router.navigate(['/booking',this.fromLocation,carId])
  }
}

