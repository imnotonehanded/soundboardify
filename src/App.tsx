import GridComponent from "./components/GridComponent";
import FloatingButton from "./components/FloatingButton";
function App() {
  navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);

  function onMIDISuccess(midiAccess: MIDIAccess) {
    for (const input of midiAccess.inputs.values()) {
      input.onmidimessage = getMIDIMessage;
    }
  }

  function getMIDIMessage(event: Event) {
    if (event instanceof MIDIMessageEvent) {
      console.log(event.data[1]);
    }
  }

  function onMIDIFailure() {
    console.log("Could not access your MIDI devices.");
  }

  return (
    <div className="container mt-5">
      <GridComponent />
      <FloatingButton />
    </div>
  );
}

export default App;
