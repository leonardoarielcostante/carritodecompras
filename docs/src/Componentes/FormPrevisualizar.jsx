import fotoRegalo from '../../Imagenes/Regalo.png'

export default function FormPrevisualizar({regalos, estado, cerrarVentana}) {

  const Print = () =>{     
    let printContents = document.getElementById('printablediv').innerHTML;
    let originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents; 
    window.location.reload(false);
  }

  return(
    <>
      {
        estado &&
          <div className="flex justify-center items-center fixed inset-0 bg-gray-700 bg-opacity-70">
            <div className="flex flex-col justify-center p-3 m-3 bg-slate-200 rounded">
            <div id='printablediv'>
              <h1 className='font-bold p-2 text-5xl'
              >Comprar:</h1>
              {
                regalos.length === 0 ? 

                <p className="text-center pb-1">No hay regalos en la lista</p> :
                
                regalos.map((regalo => 
                  <div className="flex items-center mx-4 my-2 bg-blue-200 px-2 py-1 rounded"
                       key={ regalo.id }>
                    <div className='w-12 h-8 flex  pr-3'>
                      {
                        (regalo.foto === '') ? <img src={fotoRegalo} /> : <img className='object-cover' src={ regalo.foto } />
                      }
                    </div>
                    <div className='font-medium'>
                    {
                      regalo.cantidad > 1 ? regalo.texto + '(' + regalo.cantidad + ')': regalo.texto
                    }
                      <div className='text-xs font-normal text-slate-700'>
                      {
                        regalo.persona !== '' ? regalo.persona : ''
                      }
                      </div>
                    </div>
                  </div>
                  )) 
                }
            </div>
                <div className='flex justify-evenly w-80'>
                <button className="text-white p-1 rounded font-medium bg-red-500 hover:bg-red-400 w-full mt-1 mr-2"
                        onClick={ () => cerrarVentana() }
                >Cerrar</button>
                <button className="text-white p-1 rounded font-medium bg-red-500 hover:bg-red-400 w-full mt-1"
                        onClick={ () => Print() }
                >Imprimir</button>
                </div>
            </div>
          </div>
      }
    </>
  )
}