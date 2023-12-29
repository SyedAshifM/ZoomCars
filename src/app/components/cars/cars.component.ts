import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss']
})
export class CarsComponent implements OnInit {


  loggedUserObj: any;

  carList: any[] = [];

  locations: any[] = [];

  carAccesObj: any = {
    "accessoriesId": 0,
    "accessoriesTitle": "",
    "showOnWebsite": false,
    "carId": 0
  };

  carObj: any = {
    "carId": 0,
    "brand": "",
    "name": "",
    "pricingDescription": "",
    "pricing": 0,
    "locationId": 0,
    "registeredOn": "2023-12-20T12:27:19.373Z",
    "imageUrl": "",
    "vehicleNo": "",
    "ownerUserId": 0,
    "ZoomCarAccessoriess": [

    ]
  };

  constructor(private carSrv: CarService) {
    const local = localStorage.getItem('zoomUser');
    if (local != null) {
      this.loggedUserObj = JSON.parse(local);
    }
  }

  ngOnInit(): void {
    this.getCars();
    this.GetAllLocations();
  }

  add() {
    const obj = JSON.stringify(this.carAccesObj);
    this.carObj.ZoomCarAccessoriess.push(JSON.parse(obj));
    this.carAccesObj = {
      "accessoriesId": 0,
      "accessoriesTitle": "",
      "showOnWebsite": false,
      "carId": 0
    }
  }


  getCars() {
    this.carSrv.GetAllCarsByOwnerId(this.loggedUserObj.userId).subscribe((res: any) => {
      this.carList = res.data;
      console.log(this.carList, "this.carList")
    });
  }

  GetAllLocations() {
    this.carSrv.GetAllLocations().subscribe((res: any) => {
      this.locations = res.data;
    });
  }

  close() {
    const model = document.getElementById('newCarModal');
    if (model != null) {
      model.style.display = 'none'
    }
  }


  open() {
    const model = document.getElementById('newCarModal');
    if (model != null) {
      model.style.display = 'block'
    }
  }

  saveCar() {
    this.carObj.ownerUserId = this.loggedUserObj.userId;
    this.carSrv.addNewCar(this.carObj).subscribe((res: any) => {
      if (res.result) {
        alert('Car Created');
        this.getCars();
        this.close();
        this.carObj = {
          "carId": 0,
          "brand": "",
          "name": "",
          "pricingDescription": "",
          "pricing": 0,
          "locationId": 0,
          "registeredOn": "2023-12-20T12:27:19.373Z",
          "imageUrl": "",
          "vehicleNo": "",
          "ownerUserId": 0,
          "ZoomCarAccessoriess": [
          ]
        }
      } else {
        alert(res.message);
      }
    })
  }

}
