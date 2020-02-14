const sketch = require("sketch");
const { DataSupplier } = sketch;
const util = require("util");

export function onStartup() {
  // To register the plugin, uncomment the relevant type:
  DataSupplier.registerDataSupplier(
    "public.text",
    "DatesFromNow",
    "SupplyData"
  );
  // DataSupplier.registerDataSupplier('public.image', 'DatesFromNow', 'SupplyData')
}

export function onShutdown() {
  // Deregister the plugin
  DataSupplier.deregisterDataSuppliers();
}

export function onSupplyData(context) {
  const dayOfTheWeek = [
    "Zondag",
    "Maandag",
    "Dinsdag",
    "Woensdag",
    "Donderdag",
    "Vrijdag",
    "Zaterdag"
  ];
  const monthNames = [
    "January",
    "Februari",
    "Maart",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Augustus",
    "September",
    "Oktober",
    "November",
    "December"
  ];

  let dataKey = context.data.key;
  const items = util.toArray(context.data.items).map(sketch.fromNative);

  var date = new Date();

  items.forEach((item, index) => {
    let data =
      dayOfTheWeek[date.getDay()] +
      " " +
      date.getDate() +
      " " +
      monthNames[date.getMonth()] +
      " " +
      date.getFullYear();
    DataSupplier.supplyDataAtIndex(dataKey, data, index);
    date.setDate(date.getDate() + 1);
  });
}
