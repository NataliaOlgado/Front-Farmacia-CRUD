import Categoria from './Categoria';
import Usuario from './Usuario';

export default interface Produto {
  id: number;
  nome: string;
  descricao: string;
  material:string;
  preco: string;
  foto: string;
  data: string;
  categoria: Categoria | null;
  usuario: Usuario | null;
}