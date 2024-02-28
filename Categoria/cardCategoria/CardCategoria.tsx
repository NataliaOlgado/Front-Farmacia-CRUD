import React from 'react'
import { Link } from 'react-router-dom'
import Categoria from '../../../models/Categoria'

interface CardCategoriaProps {
  categoria: Categoria
}

function CardCategorias({categoria}: CardCategoriaProps) {
  return (
    <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>
      <div className="flex w-full bg-rosapink py-2 px-4 items-center gap-4"> Categoria 
      </div>
      <div className='p-4 '>
        <h4 className='text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r text-transparent from-rosalaranja to-laranja font-serif uppercase'>{categoria.id}</h4>
        <p className='text-lg text-transparent bg-clip-text bg-gradient-to-r text-transparent from-rosalaranja to-laranja font-serif'>Descrição: {categoria.descricao}</p>
        <p className='text-lg  text-transparent bg-clip-text bg-gradient-to-r text-transparent from-rosalaranja to-laranja font-serif' >Tarja: {categoria.tarja}</p>
        <div className="flex">
        <Link to={`/editarCategoria/${categoria.id}`} className='w-full text-slate-100 bg-indigo-400 hover:bg-indigo-800 flex items-center justify-center py-2'>
          <button>Editar</button>
        </Link>
        <Link to={`/deletarCategoria/${categoria.id}`} className='text-slate-100 bg-red-400 hover:bg-red-700 w-full flex items-center justify-center'>
          <button>Deletar</button>
        </Link>
      </div>
    </div>
    </div>
  )  
}


export default CardCategorias