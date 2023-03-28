import Listaderegalos from "./Componentes/Listaderegalos";
import Snowfall from 'react-snowfall'

export default function App() {

  return (
    <div className="aplicacion-regalos w-screen h-screen flex flex-col items-center justify-center bg-background bg-no-repeat bg-cover">
      <div>
        <Snowfall />
        <Listaderegalos />
      </div>
    </div>
  );
};


