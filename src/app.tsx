import { useState, useEffect } from "preact/hooks";
import { ListPane } from "./components/ListPane/ListPane";
import { SideButton } from "./components/SideButton/SideButton";
import type { GlobalState } from "./types/statefulTypes";
import "./app.css";
import { themes } from "./data/themes";
import type { Theme } from "./types/statefulTypes";

export function App() {
  // data

  const [appData, setAppData] = useState<GlobalState>({
    listData: {},
  });

  useEffect(() => {
    const storedData = localStorage.getItem("jumpscare-data");
    if (storedData) {
      setAppData(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("jumpscare-data", JSON.stringify(appData));
  }, [appData]);

  // themes

  const [curTheme, setCurTheme] = useState<Theme>("phi");

  useEffect(() => {
    const storedTheme = localStorage.getItem("jumpscare-theme");
    if (storedTheme) {
      setCurTheme(storedTheme as Theme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("jumpscare-theme", curTheme as Theme);
  }, [curTheme]);

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
              color={themes[curTheme](i)}
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
          {Object.keys(appData.listData).length === 0 && (
            <div id="empty-list-message">
              <p>
                <strong>No lists found.</strong>
                <br /> Create one by clicking the "+" button on the right.
              </p>
            </div>
          )}
          <SideButton
            addPane={() => {
              const newLists = { ...appData.listData };
              const newId =
                Math.max(
                  0,
                  ...Object.values(newLists).map((l) => Number(l.id))
                ) + 1;
              newLists[`My list ${newId}`] = { id: `${newId}`, items: [] };
              setAppData({ listData: newLists });
            }}
            theme={curTheme}
            setTheme={setCurTheme}
          />
        </div>
      </div>
    </>
  );
}
