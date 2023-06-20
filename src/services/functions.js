//import Vue from "vue";

export function createList(sampleData) {
  let objList = [];

  const data = sampleData.coverage.installers;

  for (var installer of data) {
    var postCharger = Object.values(installer)[0];
    var name = Object.keys(installer)[0].toString();
    for (var codeObj of postCharger.postcode) {
      let obj = {};
      obj.installer = name;
      obj.postcode = codeObj.code.replace(/\s/g, "");
      obj.radius = codeObj.radius;
      obj.chargers = postCharger.chargers.map((charger) =>
        charger.toLowerCase()
      );
      objList.push(obj);
    }
  }

  return objList;
}



