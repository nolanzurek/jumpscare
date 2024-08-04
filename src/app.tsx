import { useState, useEffect } from "preact/hooks";
import { ListPane } from "./components/ListPane/ListPane";
import { SideButton } from "./components/SideButton/SideButton";
import type { GlobalState } from "./types/statefulTypes";
import "./app.css";

export function App() {
  const [appData, setAppData] = useState<GlobalState>({
    listData: {
      "My list 1": {
        id: "1",
        items: [
          { id: "1", text: "item 1" },
          { id: "2", text: "item 2" },
          { id: "3", text: "item 3" },
        ],
      },
    },
  });

  useEffect(() => {
    const storedData = localStorage.getItem("appData");
    if (storedData) {
      setAppData(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("appData", JSON.stringify(appData));
  }, [appData]);

  return (
    <>
      {/* <h1>Jumpscare</h1> */}
      <div id="page-content-container">
        <div id="panes-container">
          {Object.entries(appData.listData).map(([name, { id, items }], i) => (
            <ListPane
              key={id}
              name={name}
              list={items}
              // derived from phi/tau: the "most irrational number" should generate the best dispersion of colors
              color={i * 98.722}
              appendToList={(item: string) => {
                const newLists = { ...appData.listData };
                newLists[name].items.push({
                  id: `${newLists[name].items.length + 1}`,
                  text: item,
                });
                setAppData({ listData: newLists });
              }}
              changeListName={(newName: string) => {
                const newLists = { ...appData.listData };
                newLists[newName] = newLists[name];
                delete newLists[name];
                setAppData({ listData: newLists });
              }}
              // improve the type of id using keyof
              removeFromList={(itemToDelete: { id: string; text: string }) => {
                const newLists = { ...appData.listData };
                newLists[name].items = newLists[name].items.filter(
                  (item) => item.id !== itemToDelete.id
                );
                setAppData({ listData: newLists });
              }}
              removePane={() => {
                const newLists = { ...appData.listData };
                delete newLists[name];
                setAppData({ listData: newLists });
              }}
            />
          ))}
          <SideButton appData={appData} setAppData={setAppData} />
        </div>
      </div>
    </>
  );
}
