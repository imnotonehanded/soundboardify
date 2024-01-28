// GridComponent.tsx
import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
interface Item {
  id: number;
  name: string;
  // Add other properties here as needed
}

interface GridProps {
  items: Item[];
}

const GridComponent: React.FC<GridProps> = ({ items }) => {
  return (
    <Container>
      <Row>
        {items.map((item) => (
          <Col key={item.id}>
            <Card>
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                {/* Render other item properties as needed */}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default GridComponent;
