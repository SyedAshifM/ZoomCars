import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent {
  carId: string = '';

  locationId: string = '';

  locations: any[] = [];
  bookingId: string = '';
  bookingDetails: any;


  loggedUserObj: any;
  bookingSuccess = false;

  carDeatils: any;
  bookingObj: any = {
    "bookingId": 0,
    "customerId": 0,
    "fromLocationId": 0,
    "toLocationId": 0,
    "travelDate": "2023-12-26T16:19:57.212Z",
    "startTime": "",
    "carId": 0,
    "pickupAddress": "",
    "alternateContactNo": "",
    "invoiceNo": "",
    "isComplete": true
  };


  constructor(
    private activeRoutes: ActivatedRoute,
    private carSrv: CarService,

  ) {

    this.GetAllLocations()
    this.activeRoutes.params.subscribe((res: any) => {
      this.carId = res.carId;
      this.locationId = res.locationId;
      this.getCarDetail();
      this.bookingObj.carId = this.carId;

    })
    const local = localStorage.getItem('zoomUser');
    if (local != null) {
      this.loggedUserObj = JSON.parse(local);
      this.bookingObj.customerId = this.loggedUserObj.userId;
    }
  }

  getCarDetail() {
    this.carSrv.GetCarById(this.carId).subscribe((res: any) => {
      this.carDeatils = res.data;
    })
  }

  GetAllLocations() {
    this.carSrv.GetAllLocations().subscribe((res: any) => {
      this.locations = res.data;
    })
  }


  createBooking() {
    this.bookingSuccess = true;
    this.carSrv.createNewBooking(this.bookingObj).subscribe((res: any) => {
      if (res.result) {
        //this.getBookingId()
        //this.bookingObj.bookingId = this.bookingId;
        alert('Booking Successfull')
      } else {
        alert(res.message)
      }
    })
  }

  getBookingId() {
    this.carSrv.GetBookingById(this.bookingId).subscribe((res:any)=>{
      this.bookingDetails = res.data;
    })
  }



  deleteBooking(){
  // this.carSrv.DeleteBookingById(this.bookingId).subscribe((res:any)=>{
  //   if(res.result){
  //     alert('Booking Deleted')
  //   }else{
  //     alert(res.message)
  //   }
  // })
}
}

