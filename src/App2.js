import logo from './logo.svg';
import './App.css';
import {useState, useEffect, useRef, forwardRef} from 'react';

// custom hook
function useFocus() {
  const targetRef = useRef(null);
  const sourceRef = useRef(null);
  const listener = useRef(null);

  function clean() {
    document.removeEventListener('keydown', listener.current);
    sourceRef.current.focus();
  }

  useEffect(() => {
    listener.current = document.addEventListener('keydown', e => {
      if (e.key === 'Tab' && targetRef.current) {
        if (document.activeElement === sourceRef.current && !e.shiftKey) {
          targetRef.current.focus();
          e.preventDefault();
        } else if (document.activeElement === targetRef.current && e.shiftKey) {
          sourceRef.current.focus();
          e.preventDefault();
        }
      }
    });

    return clean;
  }, []);

  return [targetRef, sourceRef, clean];
}

const Modal = forwardRef(function Modal (props, ref) {
  console.log(ref);
  return (
    <div style={{backgroundColor: 'grey', padding: '16px', margin: '16px'}}>
      <a ref={ref} className="App-link" href="" onClick={(e) => {
        e.preventDefault();
        props.onClick(e);
      }}>Click me!</a><br />
      <a className="App-link" href="">Learn Vue</a>
    </div>
  );
});

function App() {
  const [showModal, setShowModal] = useState(false);
  const [targetRef, sourceRef, clean] = useFocus();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          ref={sourceRef}
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            e.preventDefault();
            setShowModal(true);
          }}
        >
          Learn React
        </a>
        <a className="App-link" href="">Do not focus me if 'click me' is visible.</a>
        <a className="App-link" href="">Do not focus me if 'click me' is visible.</a>
        {showModal && <Modal ref={targetRef} onClick={() => {
          setShowModal(false);
          clean();
        }} />}
        <a className="App-link" href="">Lalala</a>
      </header>
    </div>
  );
}

export default App;
