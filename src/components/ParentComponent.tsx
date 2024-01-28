import { Component } from "react";
import ButtonComponent from "./ButtonComponent";
import GridComponent from "./GridComponent";

interface Item {
  id: number;
  name: string;
  // Add other properties here as needed
}

interface ParentState {
  items: Item[];
}

class ParentComponent extends Component<unknown, ParentState> {
  constructor(props: unknown) {
    super(props);
    this.state = {
      items: [], // Array to hold the grid items
    };
  }

  // Function to add an item to the grid
  addItemToGrid = (newItem: Item) => {
    this.setState((prevState) => ({
      items: [...prevState.items, newItem],
    }));
  };

  render() {
    return (
      <div>
        <ButtonComponent addItemToGrid={this.addItemToGrid} />
        <GridComponent items={this.state.items} />
      </div>
    );
  }
}

export default ParentComponent;
