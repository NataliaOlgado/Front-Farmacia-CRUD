import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { Await, useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import Produto from '../../../models/Produto';
import Categoria from '../../../models/Categoria';
import { buscar, atualizar, cadastrar, nome,preco,material } from '../../../service/Service';
import { toastAlerta } from '../../../utils/toastAlerta';

function FormularioProduto() {
  let navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const [categoria, setCategoria] = useState<Categoria>({
    id: 0,
    descricao: '',
    tarja:''
  });

  const [produto, setProduto] = useState<Produto>({
    
    id: 0,
    nome: '',
    descricao: '',
    material: '',
    preco: '',
    foto: '',
    data: '',
    categoria: null,
    usuario: null,
  });

    async function buscarProdutoPorId(id: string) {
    await buscar (`/produto/${id}`, setProduto, {
      headers: {
        Authorization: token,
      },
    });
  }
  async function buscarProdutoPorNome(nomes: string) {
    await nome (`/produto/${nomes}`, setProduto, {
      headers: {
        Authorization: token,
      },
    });
  }
  async function buscarProdutoPorMaterial(materiais: string) {
    await material (`/produto/${materiais}`, setProduto, {
      headers: {
        Authorization: token,
      },
    });
  }

  async function buscarProdutoPorPreco(precos: string) {
    await preco (`/produto/${precos}`, setProduto, {
      headers: {
        Authorization: token,
      },
    });
  }


  async function buscarCategoriaPorId(id: string) {
    await buscar(`/categoria/${id}`, setCategorias, {
      headers: {
        Authorization: token,
      },
    });
  }
  async function buscarCategoria() {
    await buscar('/categoria', setCategoria, {
      headers: {
        Authorization: token,
      },
    });
  }
  useEffect(() => {
    if (token === '') {
      toastAlerta('Você precisa estar logado', 'info');
      navigate('/');
    }
  }, [token]);

  useEffect(() => {
    buscarCategoria();
    if (id !== undefined) {
      buscarProdutoPorId(id);
      console.log(categoria);
    }
  }, [id]);

  useEffect(() => {
    buscarProdutoPorNome('');
    if (id !== undefined) {
      buscarProdutoPorId(id);
      console.log(produto);
    }
  }, [id]);

  useEffect(() => {
    buscarProdutoPorPreco('');
    if (id !== undefined) {
      buscarProdutoPorId(id);
      console.log(produto);
    }
  }, [id]);


  useEffect(() => {
    buscarProdutoPorMaterial('');
    if (id !== undefined) {
      buscarProdutoPorId(id);
      console.log(produto);
    }
  }, [id]);


  useEffect(() => {
    setProduto({
      ...produto,
      categoria: categoria,
    });
  }, [categoria]);


  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setProduto({
      ...produto,
      [e.target.name]: e.target.value,
      categoria: categoria,
      usuario: usuario,
    });
  }

  function retornar() {
    navigate('/produto');
  }

  async function gerarNovoProduto(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    console.log({ produto });

    if (id != undefined) {
      try {
        await atualizar(`/produto`, produto, setProduto, {
          headers: {
            Authorization: token,
          },
        });
        toastAlerta('Produto atualizado com sucesso', 'sucesso');
        retornar();
      } catch (error: any) {
        if (error.toString().includes('403')) {
          toastAlerta('O token expirou, favor logar novamente', 'info')
          handleLogout()
        } else {
          toastAlerta('Erro ao atualizar o Produto', 'erro');
        }
      }
    } else {
      try {
        await cadastrar(`/produto`, produto, setProduto, {
          headers: {
            Authorization: token,
          },
        });

        toastAlerta('Produto cadastrado com sucesso', 'sucesso');
        retornar();
      } catch (error: any) {
        if (error.toString().includes('403')) {
          toastAlerta('O token expirou, favor logar novamente', 'info')
          handleLogout()
        } else {
          toastAlerta('Erro ao cadastrar a Produto', 'erro');
        }
      }
    }
  }
    
  const carregandoCategoria = categoria.descricao === '';

  return (
    <div className="container flex flex-col mx-auto items-center">
      <h1 className="text-4xl text-center my-8">{id !== undefined ? 'Editar Produto' : 'Cadastrar Produto'}</h1>

      <form onSubmit={gerarNovoProduto} className="flex flex-col w-1/2 gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="titulo">Nome do Produto</label>
          <input
            value={produto.nome}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            type="text"
            placeholder="Titulo"
            name="titulo"
            required
            className="border-2 border-slate-700 rounded p-2"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="titulo">Descricao do Produto</label>
          <input
            value={produto.descricao}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            type="text"
            placeholder="Texto"
            name="texto"
            required
            className="border-2 border-slate-700 rounded p-2"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="titulo">Material do Produto</label>
          <input
            value={produto.material}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            type="text"
            placeholder="Material"
            name="Material"
            className="border-2 border-slate-700 rounded p-2"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="titulo">Preço do Produto</label>
          <input
            value={produto.preco}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            type="text"
            placeholder="$$$$$"
            name="$$$"
            required
            className="border-2 border-slate-700 rounded p-2"
          />
        </div>
        <div className="flex flex-col gap-2">
          <p>Categoria do Produto</p>
          <select name="categoria" id="categoria" className='border p-2 border-slate-800 rounded' onChange={(e) => buscarCategoriaPorId(e.currentTarget.value)}>
            <option value="" selected disabled>Selecione uma Categoria</option>
            {categorias.map((categoria) => (
              <>
                <option value={categoria.id} >{categoria.descricao}</option>
              </>
            ))}
          </select>
          </div>     
        <button disabled={carregandoCategoria} type='submit' className='rounded disabled:bg-slate-200 bg-indigo-400 hover:bg-indigo-800 text-white font-bold w-1/2 mx-auto block py-2'>
          {carregandoCategoria ? <span>Carregando</span> : id !== undefined ? 'Editar' : 'Cadastrar'}
        </button>
      </form>
      </div>
  );
}

export default FormularioProduto;