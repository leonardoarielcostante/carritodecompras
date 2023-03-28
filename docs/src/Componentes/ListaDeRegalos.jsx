import { useState } from "react";
import FormularioRegalos from "./FormularioRegalos";
import Regalo from "./Regalo";
import { useLocalStorage } from "../Hooks/useLocalStorage";
import { useCostoTotal } from "../Hooks/useCostoTotal";
import FormPrevisualizar from "./FormPrevisualizar";
import { MdMusicNote, MdMusicOff } from "react-icons/md"
import { useMusica } from "../Hooks/useMusica";

export default function Listaderegalos() {

  const [regalos, setRegalos] = useLocalStorage('text', []);
  const [regaloEditar, setRegaloEditar] = useState([]);
  const [musica, setMusica] = useState(false);
  const [pestaña, setPestaña] = useState(false);
  const [editando, setEditando] = useState(false);
  const [previsualizar, setPrevisualizar] = useState(false);
  const { total } = useCostoTotal(regalos);
  useMusica(musica);

  const condicion = regalo => regalos.findIndex(item => item.texto === regalo.texto && item.persona === regalo.persona && item.cantidad === regalo.cantidad && item.precio === regalo.precio && item.foto === regalo.foto);

  const agregarRegalo = regalo => {

    if (regalo.texto.trim() && condicion(regalo) === -1) {
      regalo.texto = regalo.texto.trim();

      const regalosActualizados = [regalo, ...regalos];
      setRegalos(regalosActualizados);     
    } else{
      alert('El regalo ya esta en tu lista.')
    }
  };

  const eliminarRegalo = id => {
    const regalosActualizados = regalos.filter(regalo => regalo.id !== id);
    setRegalos(regalosActualizados);
  };

  const botonAgregar = () => {
    setPestaña(true);
    setEditando(false);
  }

  const manejarEdicion = regalo => {
    if(regalo.texto.trim() && condicion(regalo) === -1){
      regalo.texto = regalo.texto.trim();
      const buscarRegalo = regalos.findIndex(item => item.id === regalo.id);
      const nuevaLista = [...regalos]
        nuevaLista[buscarRegalo] = regalo;
        setRegalos(nuevaLista);
    } else{
      alert('El regalo ya esta en tu lista.')
    }
  }

  const editarRegalo = (id, estado) => {
    setEditando(estado);
    setPestaña(true);
    const buscarRegalo = regalos.findIndex(regalo => regalo.id === id);
    setRegaloEditar(regalos[buscarRegalo]);
  } 

  const cerrarVentana = () => {
    setPestaña(false);
    setPrevisualizar(false);
    setEditando(false);
    setRegaloEditar([]);
  };

  return (
    <>
      <FormularioRegalos onSubmit={ editando ? manejarEdicion : agregarRegalo }
                         cerrarVentana={ cerrarVentana }
                         estado={ pestaña }
                         editando={ editando }
                         regalo={ regaloEditar }
      />
      <FormPrevisualizar regalos={ regalos }
                         estado={ previsualizar }
                         cerrarVentana={ cerrarVentana }

      />
    <div className="bg-slate-200 rounded w-96">
      <div className="flex justify-between items-center">
        <h1 className="font-bold p-2 text-5xl">Regalos:</h1>
        <button onClick={ () => setMusica(!musica) }
        className=' text-4xl pr-2 pt-4'>
          {
           musica ?  
           <MdMusicNote /> :
           <MdMusicOff /> 
          }
        </button>  
      </div>
      <div className="flex py-3 items-center justify-center">
        <button className="text-white p-1 rounded font-medium bg-red-500 hover:bg-red-400 w-full mx-3"
                onClick={ botonAgregar }
        >Agregar Regalo</button>
      </div>
      
      <div>
        {
         regalos.length === 0 ?

          <p className="text-center pb-1">No hay regalos en la lista</p> :

          regalos.map((regalo => 
            <Regalo 
              texto={ regalo.texto }
              persona={ regalo.persona }
              key={ regalo.id }
              id={ regalo.id }
              cantidad={ regalo.cantidad }
              foto={ regalo.foto }
              precio={ regalo.precio }
              eliminarRegalo={ eliminarRegalo }
              editarRegalo={ editarRegalo }
              duplicarRegalo={ editarRegalo }
            />
            ))
        }
      </div>
      <div className="flex justify-center border-t-2 border-gray-400 mx-2 font-medium"
      >Total:${ total } </div>
      <div className="flex justify-center py-4">
        <button className="text-white bg-red-500 rounded p-1 font-medium w-full mx-3 hover:bg-red-400"
                onClick={ () => setRegalos([]) }
        >Borrar todo</button>
        <button className="text-white bg-red-500 rounded p-1 font-medium w-full mx-3 hover:bg-red-400"
                onClick={ () => setPrevisualizar(true) }
        >Previsualizar</button>
      </div>
    </div>
    </>
  )
}