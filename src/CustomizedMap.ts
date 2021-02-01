import { Internship } from "./Internship";
import { Student } from "./Student";

export class CustomizedMap {
  private googleMap: google.maps.Map;

  constructor(divId: string) {
    this.googleMap = new google.maps.Map(
      document.getElementById(divId) as HTMLElement,
      {
        zoom: 1,
        center: {
          lat: 0,
          lng: 0,
        },
      }
    );
  }
  addPin(pinnable: Student | Internship) {
    let contentString: string = "";
    const googlePin = new google.maps.Marker({
      map: this.googleMap,
      position: {
        lat: pinnable.location.latitude,
        lng: pinnable.location.longitude,
      },
    });

    if (pinnable instanceof Student) {
      contentString = `<h2>${pinnable.getFullname()}</h2>`
    }
    else if (pinnable instanceof Internship){
      contentString = `<h2>Welcome to ${pinnable.businessName}'s Internship!</h2>`
    }

    const infowindow = new google.maps.InfoWindow({
      content: contentString,
    });

    googlePin.addListener("click", () => {
      infowindow.open(this.googleMap, googlePin)
    })

  }
  // addStudentMarker(student: Student) {
  //   new google.maps.Marker({
  //     map: this.googleMap,
  //     position: {
  //       lat: student.location.latitude,
  //       lng: student.location.longitude,
  //     },
  //   });
  // }
  // addInternshipMarker(internship: Internship) {
  //   new google.maps.Marker({
  //     map: this.googleMap,
  //     position: {
  //       lat: internship.location.latitude,
  //       lng: internship.location.longitude,
  //     },
  //   });
  // }
}
