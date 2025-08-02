import ProfessionalBoard from "./components/ProfessionalBoard";
import { cemmProfesionalesData } from "./data/cemmProfesionalesData";
import "./styles/globals.scss";

function App() {
  return (
    <div className="app">
      <ProfessionalBoard professionals={cemmProfesionalesData} />
    </div>
  );
}

export default App;
