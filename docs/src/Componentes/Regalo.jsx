  import fotoRegalo from '../../Imagenes/Regalo.png'

export default function Regalo({id, texto, cantidad, foto, persona, eliminarRegalo, editarRegalo, duplicarRegalo, precio}) {

  return (
    <div className="flex items-center mx-4 my-2 bg-blue-200 px-2 py-1 rounded">
      <div className='w-12 h-8 flex  pr-3'>
        {
          (foto === '') ? <img src={fotoRegalo} /> : <img className='object-cover' src={ foto } />
        }
      </div>
      <div className='w-full flex flex-col justify-center'>
        <div className='font-medium flex'>
        {
          cantidad > 1 ? texto + '(' + cantidad + ')' + ' -' : texto + ' -'
        }
        <div className='ml-1'>
          {
            cantidad > 1 ?
           '$' + precio * cantidad : '$' + precio
          }
        </div>
        </div>
        <div className='text-xs text-slate-700'>
        {
          persona !== '' ? persona : ''
        }
        </div>
      </div>
      <div className='flex justify-end'>
        <button className="bg-red-500 rounded px-1 mr-2 hover:bg-red-400"
                onClick={() => editarRegalo(id, true)}
        >E</button>
        <button className="bg-red-500 rounded px-1 mr-2 hover:bg-red-400"
                onClick={() => duplicarRegalo(id, false)}
        >D</button>
        <button className="bg-red-500 rounded px-1 hover:bg-red-400"
                onClick={() => eliminarRegalo(id)}
        >X</button>
      </div>
    </div>
  )
};