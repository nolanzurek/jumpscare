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
