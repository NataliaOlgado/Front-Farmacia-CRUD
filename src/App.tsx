import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/login/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import Cadastro from './pages/cadastro/Cadastro';
import Navbar from './componentes/navbar/Navbar';
import Home from './pages/home/Home';
import Footer from './componentes/footer/Footer';
import Perfil from './pages/perfil/Perfil';
import ListaCategorias from './componentes/Categoria/listaCategoria/ListaCategoria';
import FormularioCategoria from './componentes/Categoria/formularioCategoria/FormularioCategoria';
import DeletarCategoria from './componentes/Categoria/deletarCategoria/DeletarCategoria';
import ListaProdutos from './componentes/Produto/listaProdutos/ListaProdutos';
import FormularioProduto from './componentes/Produto/formularioProduto/FormularioProduto';
import DeletarProduto from './componentes/Produto/deletarProduto/DeletarProduto';

function App() {
  
  return (
    <>
      <AuthProvider>
      <ToastContainer />
        <BrowserRouter>
        <Navbar />
          <div className='min-h-[80vh]'>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cadastro" element={<Cadastro />} />
              <Route path="/home" element={<Home />} />
              <Route path="/categorias" element={<ListaCategorias />} />
              <Route path="/cadastroCategoria" element={<FormularioCategoria />} />
              <Route path="/editarCategoria/:id" element={<FormularioCategoria />} />
              <Route path="/deletarCategoria/:id" element={<DeletarCategoria />} />
              <Route path="/produto" element={<ListaProdutos />} />
              <Route path="/cadastroProduto" element={<FormularioProduto />} />
              <Route path="/editarProduto/:id" element={<FormularioProduto />} />
              <Route path="/deletarProduto/:id" element={<DeletarProduto />} />
              <Route path="/perfil" element={<Perfil />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;