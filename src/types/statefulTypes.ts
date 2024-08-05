import { themes } from "../data/themes";

export type GlobalState = {
  listData: Record<string, ItemList>; // listId -> listItems
  // later: settings, etc
};

export type ItemList = {
  id: string;
  items: {
    id: string;
    text: string;
  }[];
};

export type Theme = keyof typeof themes;
