import React from "react";
import useGeoLocation from "../../hooks/useGeolocation";
import {useJsApiLoader} from "@react-google-maps/api"

function MapExample({props}) {
  const mapRef = React.useRef(null);

  React.useEffect(() => {
    let google = window.google;
    let map = mapRef.current;
    let lat = props.lat;
    let lng = props.lng;
 
    // let lat = '-6.200511971721622';
    // let lng = '106.849624984375';
    const myLatlng = new google.maps.LatLng(lat, lng);
    const mapOptions = {
      zoom: 15,
      center: myLatlng,
      scrollwheel: false,
      zoomControl: true,
      styles: [
        {
          featureType: "administrative",
          elementType: "labels.text.fill",
          stylers: [{ color: "#444444" }],
        },
        {
          featureType: "landscape",
          elementType: "all",
          stylers: [{ color: "#f2f2f2" }],
        },
        {
          featureType: "poi",
          elementType: "all",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "road",
          elementType: "all",
          stylers: [{ saturation: -100 }, { lightness: 45 }],
        },
        {
          featureType: "road.highway",
          elementType: "all",
          stylers: [{ visibility: "simplified" }],
        },
        {
          featureType: "road.arterial",
          elementType: "labels.icon",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "transit",
          elementType: "all",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "water",
          elementType: "all",
          stylers: [{ color: "#4299e1" }, { visibility: "on" }],
        },
      ],
    };

    map = new google.maps.Map(map, mapOptions);

    const marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      animation: google.maps.Animation.DROP,
      title: "Notus React!",
    });

    const contentString =
      '<div class="info-window-content"><h2>Posisi Anda Sekarang</h2>' +
      "<p>Hai Saya Disini</p></div>";

    const infowindow = new google.maps.InfoWindow({
      content: contentString,
    });

    google.maps.event.addListener(marker, "click", function () {
      infowindow.open(map, marker);
    });
  });
  return (
    <>
      <div className="relative w-full rounded" style={{height : 300}}>
        <div className="rounded h-full" ref={mapRef} />
      </div>
    </>
  );
}

export default MapExample;
