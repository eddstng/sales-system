import './App.css';
import Sidebar from './components/Sidebar'
import { ChakraProvider } from "@chakra-ui/react"

function App() {
  return (
    <div className="App">
      <ChakraProvider>
        <Sidebar />
      </ChakraProvider>
    </div>
  );
}

export default App;
