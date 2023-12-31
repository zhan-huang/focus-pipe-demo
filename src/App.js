import logo from './logo.svg';
import './App.css';
import {useState, useEffect, useRef} from 'react';

// custom hook
function useFocus() {
  const targetRef = useRef(null);
  const sourceRef = useRef(null);

  useEffect(() => {
    sourceRef.current = document.activeElement;
    const listener = document.addEventListener('keydown', e => {
      if (e.key === 'Tab') {
        if (document.activeElement === sourceRef.current && !e.shiftKey) {
          targetRef.current.focus();
          e.preventDefault();
        } else if (document.activeElement === targetRef.current && e.shiftKey) {
          sourceRef.current.focus();
          e.preventDefault();
        }
      }
    });

    return () => {
      document.removeEventListener('keydown', listener);
      sourceRef.current.focus();
    }
  }, []);

  return targetRef;
}

function Modal ({onClick}) {
  const targetRef = useFocus();
  return (
    <div style={{backgroundColor: 'grey', padding: '16px', margin: '16px'}}>
      <a ref={targetRef} className="App-link" href="" onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}>Click me!</a><br />
      <a className="App-link" href="">Learn Vue</a>
    </div>
  );
}

function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
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
        {showModal && <Modal onClick={() => {
          setShowModal(false);
        }} />}
        <a className="App-link" href="">Lalala</a>
      </header>
    </div>
  );
}

export default App;
