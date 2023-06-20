<template>
  <div
    class="z20 bg-white fixed top-7 w-[490px] rounded-md sm:w-[620px] md:w-[690px] lg:w-[960px] xl:w-[1010px] 2xl:w-[1210px] max-h-screen flex flex-wrap justify-center h-screen scrollbar-hide z-0 overflow-y-auto hover:overflow-scroll"
  >
    <div class="w-full flex justify-center py-4">
      <div class="text-gray-700 text-3xl font-bold mr-4">Coverage Overview</div>
    </div>

    <div
      class="bg-white flex flex-wrap items-center justify-center m-2 w-full h-[300px] md:mx-[4px] border-solid border-blue-300 rounded-md mb-[20px]"
    >
      <!-- wraps all 3 group containers -->
      <div
        class="w-full flex flex-wrap justify-center items-center h-[260px] border-green-600"
      >
        <div class="hidden md:flex border-gray-300 h-[180px]">
          <div class="h-0 md:h-3 font-bold my-4 pr-3">Filters:</div>
        </div>
        <!-- wraps chargers and installers -->
        <div
          class="w-[440px] sm:w-[350px] lg:w-[600px] xl:w-[660px] h-[180px] flex flex-wrap justify-around items-center border-yellow-600"
        >
          <!-- wraps chargers -->
          <div
            class="w-[150px] md:w-[150px] h-[150px] flex flex-wrap mr-4 border-pink-300"
          >
            <label for="chargers" class="mr-4 w-[67px]">Chargers:</label>
            <select
              id="chargers"
              multiple
              v-model="selectedCharger"
              class="w-[141px] border-solid border-b-2 border-gray-300"
            >
              <option
                v-for="charger in chargerOptions"
                :value="charger"
                :key="charger"
              >
                {{ charger }}
              </option>
            </select>
          </div>

          <!-- wraps installer -->
          <div
            class="w-[150px] md:w-[150px] h-[150px] flex flex-wrap md:mr-4 border-pink-300"
          >
            <label for="installers" class="mr-4 w-[67px]">Installers:</label>
            <select
              id="installers"
              multiple
              v-model="selectedInstaller"
              class="w-[141px] border-solid border-b-2 border-gray-300"
            >
              <option
                v-for="(installer, index) of installerOptions"
                :value="installer"
                :key="index"
              >
                {{ installer }}
              </option>
            </select>
          </div>
        </div>

        <!-- wraps postcode,radius -->
        <div
          class="px-6 sm:py-4 w-[440px] h-[30px] sm:w-[200px] sm:h-[180px] 2xl:w-[440px] flex flex-wrap justify-between items-center sm:items-start border-yellow-400"
        >
          <!-- wraps postcode -->
          <div
            class="w-[150px] h-[25px] sm:h-[50px] 2xl:w-[300px] flex flex-wrap items-start mr-4"
          >
            <label for="postcode" class="hidden sm:block mr-2 w-[119px]"
              >Postcode:</label
            >
            <input
              type="text"
              id="postcode"
              v-model="postcode"
              placeholder="Enter postcode"
              class="w-[140px] h-[25px] border-b-2"
            />
          </div>

          <!-- wraps radius -->
          <div
            class="w-[150px] h-[25px] sm:h-[50px] md:w-[300px] flex flex-wrap items-start md:mr-4"
          >
            <label for="radius" class="hidden sm:block mr-2 w-[119px]"
              >Radius (in miles):</label
            >
            <input
              type="number"
              id="radius"
              v-model="radius"
              placeholder="Enter radius"
              class="w-[140px] h-[25px] border-b-2"
            />
          </div>
        </div>
        <div
          class="border-blue-500 w-[440px] h-[35px] sm:w-full flex flex-wrap justify-end"
        >
          <div
            class="px-6 w-[440px] h-[35px] sm:w-[400px] flex flex-wrap justify-between items-center border-yellow-400"
          >
            <button
              @click="resetFilter"
              class="w-[150px] h-[32px] bg-gray-400 rounded-lg text-white text-sm text-center"
            >
              reset
            </button>
            <button
              id="goButton"
              @click="sieveData"
              class="w-[150px] h-[32px] bg-[#ff007f] rounded-lg text-white text-sm text-center"
            >
              Go
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Rest of the Coverage Overview page content -->
    <MapView :mapData="filteredData" />
  </div>
</template>

<script>
import sampleData from "@/data/sample-data.json";
import MapView from "@/components/MapView.vue";
import { createList } from "@/services/functions.js";

//let newData;
export default {
  data() {
    return {
      selectedCharger: [],
      selectedInstaller: [],
      postcode: "",
      radius: "",
      chargerOptions: [
        "Mini Pro3",
        "Easee One",
        "Ohme Home Pro",
        "Ohme Epod",
        "Indra Smart Pro",
        "Zappi 2.1",
        "Wallbox Pulsar Plus",
      ],
      installerOptions: [],
      myData: [],
      filteredData: [],
    };
  },

  created() {
    this.myData = createList(sampleData);
    this.filteredData = this.myData;
  },
  mounted() {
    this.populateInstallerOptions();
  },
  methods: {
    populateInstallerOptions() {
      const installerObjects = sampleData.coverage.installers;
      this.installerOptions = installerObjects.map(
        (installer) => Object.keys(installer)[0]
      );
    },
    isInChargers(str, arr) {
      const lowercaseStr = str.toLowerCase();
      return arr.some((item) => item.toLowerCase() == lowercaseStr);
    },

    sieveData() {
      let filteredData = JSON.parse(JSON.stringify(this.myData));
      this.filteredData = filteredData.filter((obj) => {
        let postcodeDidMatch = true;
        let radiusDidMatch = true;
        let installerDidMatch = true;
        let chargerDidMatch = true;

        if (this.postcode) {
          postcodeDidMatch = obj.postcode
            .toLowerCase()
            .includes(this.postcode.toLowerCase().replace(/\s/g, ""));
        }
        if (this.radius) {
          radiusDidMatch = obj.radius == this.radius;
        }

        if (this.selectedInstaller.length > 0) {
          installerDidMatch = obj.installer
            .toLowerCase()
            .includes(this.selectedInstaller[0].toLowerCase());
        }

        if (this.selectedCharger.length > 0) {
          chargerDidMatch = this.isInChargers(
            this.selectedCharger[0],
            obj.chargers
          );
        }

        return (
          postcodeDidMatch &&
          radiusDidMatch &&
          installerDidMatch &&
          chargerDidMatch
        );
      });
    },

    resetFilter() {
      this.filteredData = this.myData;
    },
  },

  components: { MapView },
};
</script>
