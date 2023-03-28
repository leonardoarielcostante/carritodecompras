import { v4 as uuidv4 } from 'uuid';
import { useEditarRegalo } from "../Hooks/useEditarRegalo";

export default function FormularioRegalos({onSubmit, estado, cerrarVentana, editando, regalo}){
  const { input, setInput, cantidad, setCantidad, foto, setFoto, persona, setPersona, precio, setPrecio } = useEditarRegalo(regalo);
  const listaRegalosAleatorios = ['Medias', 'Remera', 'Pantalon', 'Bebida', 'Mochila', 'Cartera', 'Juegos de mesa', 'Golosinas']


  const manejarEnvio = e => {
    e.preventDefault();

    const nuevoRegalo = {
      id: uuidv4(),
      persona: persona,
      precio: precio,
      texto: input,
      cantidad: cantidad,
      foto: foto,
    };
    {onSubmit(nuevoRegalo)}
  };

  const manejarEdicion = e => {
    e.preventDefault();

    const regaloAEditar = {
      id: regalo.id,
      persona: persona,
      precio: precio,
      texto: input,
      cantidad: cantidad,
      foto: foto,
    }
    {onSubmit(regaloAEditar)}
  }

  const regaloAleatorio = (lista) => {
    const indice = Math.floor(Math.random() * lista.length);
      return(lista[indice])
  }

  return (
    <>
    { estado &&
            <div className="flex justify-center items-start fixed inset-0 bg-gray-700 bg-opacity-70">
              <form className="flex flex-col justify-center p-3 m-3 bg-slate-200 rounded"
                    onSubmit={ editando ? manejarEdicion : manejarEnvio }>
                <div className='flex justify-center mb-3'>
                  <input className="rounded border p-1 mr-1"
                         placeholder="Ingresa tu regalo aqui" 
                         type='text'
                         name='texto'
                         required={true}
                         onChange={(e => setInput(e.target.value))}
                         defaultValue={input}
                  />
                  <button className='rounded bg-white px-2'
                          type="button"
                          onClick={ () => setInput(regaloAleatorio(listaRegalosAleatorios)) }
                  >Sorprendeme!</button>
                </div>
                <input className='rounded mb-3 p-1'
                       type='number'
                       name='precio'
                       placeholder='Precio'
                       min='0'
                       defaultValue={precio}
                       required={true}
                       onChange={ (e => setPrecio(e.target.value)) }
                />
                <input className="rounded border mb-3 p-1"
                       placeholder="Para..."
                       type='text'
                       name='persona'
                       onChange={(e => setPersona(e.target.value))}
                       defaultValue={persona}
                />
                <input className="rounded mb-3 p-1"
                       type='number'
                       name='cantidad'
                       placeholder="Cantidad"
                       required={true}
                       min='1'
                       defaultValue={cantidad}
                       onChange={(e => setCantidad(e.target.value))}
                />
                <input className='rounded p-1 mb-3'
                       type='url'
                       name='foto'
                       placeholder="http://imagen"
                       onChange={(e => setFoto(e.target.value))}
                       defaultValue={foto}
                />
                <div className="flex justify-evenly">
                  <button className="text-white bg-red-500 px-4 font-medium rounded hover:bg-red-400"
                          onClick={() => cerrarVentana()}
                  >Cerrar</button>
                  <button className="text-white bg-red-500 px-3 font-medium rounded hover:bg-red-400"
                  >{editando ? 'Guardar' : 'Agregar'}</button> 
                </div>
              </form>
            </div>
    }
    </>
  );
};