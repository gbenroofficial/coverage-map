<template>
  <div>
    <h1></h1>
    <div
      id="map"
      class="block h-[400px] w-[480px] sm:w-[500px] md:w-[630px] lg:w-[950px] xl:w-[1000px] 2xl:w-[1200px] border-black"
    ></div>
    <div class="overflow-x-auto">
    <table
      class="mt-10 table-auto border-collapse rounded-lg overflow-hidden shadow-lg w-[480px] sm:w-[500px] md:w-[630px] lg:w-[950px] xl:w-[1000px] 2xl:w-[1200px]"
    >
      <thead>
        <tr>
          <th class="px-6 py-3 bg-pink-300 text-white text-left">Installer</th>
          <th class="px-6 py-3 bg-pink-300 text-white text-left">Postcode</th>
          <th class="px-6 py-3 bg-pink-300 text-white text-left">Radius</th>
          <th class="px-6 py-3 bg-pink-300 text-white text-left">Chargers</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="obj in mapData" :key="obj.id">
          <td class="px-6 py-4 border-b">{{ obj.installer }}</td>
          <td class="px-6 py-4 border-b">{{ obj.postcode }}</td>
          <td class="px-6 py-4 border-b">{{ obj.radius }}</td>
          <td class="px-6 py-4 border-b">
            <ul>
              <li v-for="item in obj.chargers" :key="item">{{ item }}</li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
    </div>
  </div>
</template>

<script>
import { Loader } from "@googlemaps/js-api-loader";

let loader;
let map;

export default {
  data() {
    return {
      postcodes: [],
      mapArray: [],
      markers: [],
      map: {},
    };
  },
  props: ["mapData"],
  created() {
    this.mapArray = this.mapData;
  },

  mounted() {
    this.initLoader();
    this.addMap();
    this.addMarkers(this.mapData);
  },

  computed: {
    isArrayInitialized() {
      return Array.isArray(this.markers) && this.markers.length > 0;
    },
  },
  watch: {
    mapData: {
      immediate: true,
      handler(newArray) {
        if (Array.isArray(newArray) && newArray.length > 0) {
          // Array is properly initialized, perform actions here
          for (let marker of this.markers) {
            marker.setVisible(false);
          }
          this.markers = [];

          this.addMarkers(newArray);
        }
      },
    },
  },

  methods: {
    initLoader() {
      loader = new Loader({
        apiKey: process.env.VUE_APP_GOOGLE_API_KEY,
        libraries: ["drawing", "geometry", "places", "visualization"],
      });
    },

    async addMap() {
      const { Map } = await loader.importLibrary("maps");

      map = new Map(document.getElementById("map"), {
        center: { lat: 51.5109, lng: -0.1209 },
        zoom: 12.4,
      });

      map.addListener("data_changed", this.handleChanged);
      this.map = map;
    },

    async addMarkers(arrayData) {
      for (var obj of arrayData) {
        try {
          const marker = await this.addMarker(obj);
          this.markers.push(marker);
        } catch (error) {
          console.error(`Failed to add marker for object: ${obj}`, error);
        }
      }
    },
    async addMarker(obj) {
      const { Marker } = await loader.importLibrary("marker");
      const { InfoWindow } = await loader.importLibrary("maps");
      const { Geocoder } = await loader.importLibrary("geocoding");

      const geocoder = new Geocoder(); // Use `google.maps.Geocoder` directly

      return new Promise((resolve, reject) => {
        geocoder.geocode(
          {
            componentRestrictions: {
              country: "UK",
              postalCode: obj.postcode,
            },
          },
          function (results, status) {
            if (status === "OK") {
              const marker = new Marker({
                position: results[0].geometry.location,
                title: "na we dey here",
                shape: [],
                map: map,
              });

              marker.addListener("click", function () {
                infoWindow.open(map, marker);
              });

              const infoWindow = new InfoWindow({
                content:
                  obj.installer +
                  "<p>" +
                  "Radius: " +
                  obj.radius +
                  " miles" +
                  "</p>" +
                  "<p>" +
                  "Postcode: " +
                  obj.postcode +
                  "</p>",
              });

              resolve(marker);
            } else {
              reject(new Error("Geocoding request failed"));
            }
          }
        );
      });
    },
  },
};
</script>
