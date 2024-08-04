export function downloadData() {
  const storedData = localStorage.getItem("appData");
  if (storedData) {
    const rawData = JSON.parse(storedData).listData;
    let exportingData: Record<string, string[]> = {};
    Object.keys(rawData).forEach((key) => {
      exportingData[key] = rawData[key].items.map(
        (item: { id: string; text: string }) => {
          return item.text;
        }
      );
    });
    const dataStr = JSON.stringify(exportingData, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
    const exportFileDefaultName = "jumpscare-data.json";
    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
    // remove link element
    linkElement.remove();
  }
}
