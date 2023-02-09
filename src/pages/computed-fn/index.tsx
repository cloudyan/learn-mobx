import * as React from "react";
import { render } from "react-dom";
import { makeAutoObservable, computed } from "mobx";
import { observer } from "mobx-react-lite";
import { computedFn } from "mobx-utils";
import "mobx-react-lite/batchingForReactDom";

type ItemType = ReturnType<typeof createItem>;


// https://mobx.js.org/computeds-with-args.html

function createItem(title: string) {
  return {
    id: "item" + Math.random(),
    title
  };
}

class ItemStore {
  items: ItemType[] = [];
  selection = new Set<string>();

  constructor() {
    makeAutoObservable(this);
    this.items.push(
      createItem("Lego"),
      createItem("XBox"),
      createItem("Laptop"),
      createItem("Kitchen")
    );
  }

  // TODO: compare (see also below)
  isSelected(id: string) {
    return this.selection.has(id);
  }
  // isSelected = computedFn((id: string) => {
  //   return this.selection.has(id);
  // });

  toggle(id: string) {
    if (this.selection.has(id)) this.selection.delete(id);
    else this.selection.add(id);
  }
}

const store = new ItemStore();

const Items = observer(() => (
  <div>
    <ul>
      {store.items.map(item => (
        <Item item={item} key={item.id} />
      ))}
    </ul>
  </div>
));

const Item = observer(({ item }: { item: ItemType }) => {
  console.log("rendering ", item.title);
  // TODO: compare
  // const isSelected = store.isSelected(item.id);
  const isSelected = computed(() => store.isSelected(item.id)).get();

  return (
    <li>
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => store.toggle(item.id)}
      />
      {item.title}
    </li>
  );
});

export default Items
