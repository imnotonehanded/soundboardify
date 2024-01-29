import { Component, ChangeEvent } from "react";
import {
  Card,
  Modal,
  Row,
  Col,
  Form,
  Container,
  Button,
} from "react-bootstrap";
import AudioCard from "../temp/AudioCard";

const translation = [
  64, 65, 66, 67, 96, 97, 98, 99, 60, 61, 62, 63, 92, 93, 94, 95, 56, 57, 58,
  59, 88, 89, 90, 91, 52, 53, 54, 55, 84, 85, 86, 87, 48, 49, 50, 51, 80, 81,
  82, 83, 44, 45, 46, 47, 76, 77, 78, 79, 40, 41, 42, 43, 72, 73, 74, 75, 36,
  37, 38, 39, 68, 69, 70, 71,
];

interface GridState {
  folderModal: boolean;
  showModal: boolean;
  selectedCard: null | number;
  cards: AudioCard[];
  currentAudio: HTMLAudioElement | null;
  currentAudioName: string;
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
      folderModal: false,
      showModal: false,
      selectedCard: null,
      currentAudio: null,
      currentAudioName: "",
      cards: Array.from({ length: 64 }, (_, i) => ({
        cordinate: `${String.fromCharCode(65 + Math.floor(i / 8))}${
          (i % 8) + 1
        }`,
        translation: translation[i],
        file: null,
      })),
    };

    navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);

    function onMIDISuccess(midiAccess: MIDIAccess) {
      for (const input of midiAccess.inputs.values()) {
        input.onmidimessage = getMIDIMessage;
      }
    }

    const getMIDIMessage = (event: Event) => {
      if (event instanceof MIDIMessageEvent) {
        if (
          event.data[2] == 0 &&
          this.state.cards[translation.indexOf(event.data[1])].file !== null
        ) {
          URL.createObjectURL(
            this.state.cards[translation.indexOf(event.data[1])].file as Blob
          );
          const file =
            this.state.cards[translation.indexOf(event.data[1])].file;
          if (file) {
            if (this.state.currentAudio) {
              this.state.currentAudio.pause();
            }
            if (this.state.currentAudioName != file.name) {
              const audio = new Audio(URL.createObjectURL(file));
              audio.play();
              this.setState({
                currentAudio: audio,
                currentAudioName: file.name,
              });
            } else {
              this.setState({
                currentAudio: null,
                currentAudioName: "",
              });
            }
          }
        }
      }
    };

    function onMIDIFailure() {
      console.log("Could not access your MIDI devices.");
    }
  }

  handleCardClick = (cardIndex: number) => {
    this.setState({
      showModal: true,
      selectedCard: cardIndex,
    });
  };

  handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const { selectedCard, cards } = this.state;
    const file = event.target.files?.[0];
    if (file && selectedCard !== null) {
      const newCard = [...cards];
      newCard[selectedCard].file = file;
      this.setState({
        showModal: false,
        cards: newCard,
        selectedCard: null,
      });
    }
  };

  handleFolderSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    const { cards } = this.state;
    if (files) {
      Array.from(files).forEach((file) => {
        if (file.type === "audio/mpeg") {
          const newCard = [...cards];
          newCard[
            translation.indexOf(
              parseInt(file.name.split(".").slice(0, -1).join("."))
            )
          ].file = file;
          this.setState({
            folderModal: false,
            cards: newCard,
          });
        }
      });
    }
  };

  render() {
    const { folderModal, showModal, cards } = this.state;

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
                      {cards[cardIndex].file?.name || "Click to add file"}
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

        <Button
          variant="primary"
          style={{
            position: "fixed",
            left: "20px",
            bottom: "20px",
          }}
          size="lg"
          onClick={() => this.setState({ folderModal: true })}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-cloud-upload"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383"
            />
            <path
              fill-rule="evenodd"
              d="M7.646 4.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V14.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708z"
            />
          </svg>
        </Button>
        <Modal
          show={folderModal}
          onHide={() => this.setState({ folderModal: false })}
        >
          <Modal.Header closeButton>
            <Modal.Title>Import a folder</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Make sure to have a config file</Form.Label>
              <Form.Control
                type="file"
                multiple
                onChange={this.handleFolderSelect}
              />
            </Form.Group>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default GridComponent;
