// ButtonComponent.tsx
import React, { Component } from "react";
import { Button } from "react-bootstrap";

interface ButtonProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  addItemToGrid: (newItem: any) => void; // Replace 'any' with your actual item type
}

class ButtonComponent extends Component<ButtonProps> {
  handleClick = () => {
    // Create a new item
    const newItem = {
      // Define the properties of the new item here
      id: Date.now(), // Example: Use a unique identifier
      name: "New Item", // Example: Item name
    };

    // Call the parent's function to add the item to the grid
    this.props.addItemToGrid(newItem);
  };

  render() {
    return (
      <div>
        <Button onClick={this.handleClick}>Add Item</Button>
      </div>
    );
  }
}

export default ButtonComponent;
