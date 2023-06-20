/* eslint-disable no-undef */
import { shallowMount } from "@vue/test-utils";
import CoverageOverview from "@/views/CoverageOverview.vue";

describe("CoverageOverview", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(CoverageOverview);
  });

  afterEach(() => {
    wrapper.destroy();
  });
  it("returns true when charger is in chargers array", () => {
    const chargers = ["Charger 1", "Charger 2", "Charger 3"];
    const result = wrapper.vm.isInChargers("Charger 2", chargers);
    expect(result).toBe(true);
  });

  it("returns false when charger is not in chargers array", () => {
    const chargers = ["Charger 1", "Charger 2", "Charger 3"];
    const result = wrapper.vm.isInChargers("Charger 4", chargers);
    expect(result).toBe(false);
  });
  it('calls sieveData method on button click', async () => {
    const sieveData = jest.fn();
    wrapper.setMethods({ sieveData }); // Mock the sieveData method
  
    const button = wrapper.find('#goButton');
    await button.trigger('click');
    await wrapper.vm.$nextTick();
  
    expect(sieveData).toHaveBeenCalled();
  });
  
  

  it("updates filteredData correctly in sieveData method", () => {
    const myData = [
      {
        postcode: "12345",
        radius: "10",
        installer: "Installer1",
        chargers: ["Charger1"],
      },
      {
        postcode: "54321",
        radius: "20",
        installer: "Installer2",
        chargers: ["Charger2"],
      },
    ];
    wrapper.setData({
      myData,
      postcode: "12345",
      radius: "10",
      selectedInstaller: ["Installer1"],
      selectedCharger: ["Charger1"],
    });
    wrapper.vm.sieveData();
    expect(wrapper.vm.filteredData).toEqual([
      {
        postcode: "12345",
        radius: "10",
        installer: "Installer1",
        chargers: ["Charger1"],
      },
    ]);
  });
  it("resets filteredData correctly in resetFilter method", () => {
    const myData = [
      {
        postcode: "12345",
        radius: "10",
        installer: "Installer1",
        chargers: ["Charger1"],
      },
      {
        postcode: "54321",
        radius: "20",
        installer: "Installer2",
        chargers: ["Charger2"],
      },
    ];
    wrapper.setData({
      myData,
      filteredData: [
        {
          postcode: "12345",
          radius: "10",
          installer: "Installer1",
          chargers: ["Charger1"],
        },
      ],
    });
    wrapper.vm.resetFilter();
    expect(wrapper.vm.filteredData).toEqual([
      {
        postcode: "12345",
        radius: "10",
        installer: "Installer1",
        chargers: ["Charger1"],
      },
      {
        postcode: "54321",
        radius: "20",
        installer: "Installer2",
        chargers: ["Charger2"],
      },
    ]);
  });
});
