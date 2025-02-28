import Index from "./components/FullScreen/Index";
import { BrowserRouter } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Index />
      </BrowserRouter>
    </div>
  );
}
 
export default App;
