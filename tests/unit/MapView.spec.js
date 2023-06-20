/* eslint-disable no-undef */
import { mount } from "@vue/test-utils";
import MapView from "@/components/MapView.vue";

describe("MapView", () => {
  it("renders table rows based on mapData prop", async () => {
    const mapData = [
      {
        installer: "Installer 1",
        postcode: "12345",
        radius: 5,
        chargers: ["Charger A", "Charger B"],
      },
      {
        installer: "Installer 2",
        postcode: "67890",
        radius: 10,
        chargers: ["Charger C", "Charger D"],
      },
    ];

    const wrapper = mount(MapView, {
      propsData: {
        mapData,
      },
    });

    // Assert that the component renders the correct number of rows
    const rows = wrapper.findAll("tbody tr");
    expect(rows.length).toBe(mapData.length);

    // Assert that the rendered data matches the provided prop data
    rows.wrappers.forEach((row, index) => {
      const columns = row.findAll("td");
      expect(columns.wrappers[0].text()).toBe(mapData[index].installer);
      expect(columns.wrappers[1].text()).toBe(mapData[index].postcode);
      expect(columns.wrappers[2].text()).toBe(mapData[index].radius.toString());
      const chargerItems = columns.wrappers[3].findAll("li");
      mapData[index].chargers.forEach((charger, chargerIndex) => {
        expect(chargerItems.wrappers[chargerIndex].text()).toBe(charger);
      });
    });
  });

  it("initializes the map and adds markers when mounted", async () => {
    const mapData = [
      {
        id: 1,
        installer: "Installer 1",
        postcode: "12345",
        radius: 5,
        chargers: ["Charger A", "Charger B"],
      },
      {
        id: 2,
        installer: "Installer 2",
        postcode: "67890",
        radius: 10,
        chargers: ["Charger C", "Charger D"],
      },
    ];

    const initLoaderMock = jest.spyOn(MapView.methods, "initLoader");
    const addMapMock = jest.spyOn(MapView.methods, "addMap");
    const addMarkersMock = jest.spyOn(MapView.methods, "addMarkers");

    // eslint-disable-next-line no-unused-vars
    const wrapper = mount(MapView, {
      propsData: {
        mapData,
      },
    });

    expect(initLoaderMock).toHaveBeenCalled();
    expect(addMapMock).toHaveBeenCalled();
    expect(addMarkersMock).toHaveBeenCalledWith(mapData);
  });

  it('updates the markers when mapData prop changes', async () => {
    const mapData = [
      { id: 1, installer: 'Installer 1', postcode: '12345', radius: 5, chargers: ['Charger A', 'Charger B'] },
      { id: 2, installer: 'Installer 2', postcode: '67890', radius: 10, chargers: ['Charger C', 'Charger D'] },
    ];

    const updatedMapData = [
      { id: 3, installer: 'Installer 3', postcode: '54321', radius: 15, chargers: ['Charger E', 'Charger F'] },
    ];

    const addMarkersMock = jest.spyOn(MapView.methods, 'addMarkers');

    const wrapper = mount(MapView, {
      propsData: {
        mapData,
      },
    });

    expect(addMarkersMock).toHaveBeenCalledWith(mapData);

    await wrapper.setProps({ mapData: updatedMapData });

    expect(addMarkersMock).toHaveBeenCalledWith(updatedMapData);
  });
});
