import { Component, ChangeEvent } from "react";
import { Card, Modal, Row, Col, Form, Container } from "react-bootstrap";
import AudioCard from "../temp/AudioCard";

interface GridState {
  showModal: boolean;
  selectedCard: null | number;
  cards: AudioCard[];
}
interface AudioCard {
  cordinate: string; // A5
  translation: number; // 75 (on the launchpad)
  file: File | null; // audio file
  
}
class GridComponent extends Component<unknown, GridState> {
  constructor(props: unknown) {
    super(props);
    this.state = {
      showModal: false,
      selectedCard: null,
      cards: Array.from({ length: 64 }, () => {cordinate, translation, file} : AudioCard),
    };
  }

  handleCardClick = (cardIndex: number) => {
    this.setState({
      showModal: true,
      selectedCard: cardIndex,
    });
  };

  handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const { selectedCard, cardItemNames } = this.state;
    const file = event.target.files?.[0];
    if (file && selectedCard !== null) {
      const newCardItemNames = [...cardItemNames];
      newCardItemNames[selectedCard] = file.name;
      this.setState({
        showModal: false,
        cardItemNames: newCardItemNames,
        selectedCard: null,
      });
    }
  };

  render() {
    const { showModal, cardItemNames } = this.state;

    // Create an 8x8 grid of cards
    const gridItems = Array.from({ length: 8 }, (_, rowIndex) => (
      <Container>
        <Row className="mb-3" key={rowIndex}>
          {Array.from({ length: 8 }, (_, colIndex) => {
            const cardIndex = rowIndex * 8 + colIndex;
            return (
              <Col key={colIndex}>
                <Card
                  className="square-card"
                  onClick={() => this.handleCardClick(cardIndex)}
                >
                  <Card.Body>
                    <Card.Title>
                      {String.fromCharCode(65 + rowIndex)}
                      {colIndex + 1}
                    </Card.Title>
                    <Card.Text>
                      {cardItemNames[cardIndex] || "Click to add file"}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    ));

    return (
      <div>
        {gridItems}
        <Modal
          show={showModal}
          onHide={() => this.setState({ showModal: false })}
        >
          <Modal.Header closeButton>
            <Modal.Title>Select a File</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Import an audio file</Form.Label>
              <Form.Control
                type="file"
                accept="audio/*"
                onChange={this.handleFileSelect}
              />
            </Form.Group>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default GridComponent;
