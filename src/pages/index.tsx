
import { useNotas } from '@/hooks/useNotas';
import PrivateRoute from '../components/PrivateRoute.js'; 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { Container, Grid } from '@mui/material';
import NotaCard from '@/components/NotaCard'; 
import CriarNota from '@/components/CriarNota';
import FiltroNotas from '@/components/FiltroNotas';
import { useUser } from '@/contexts/userContext';

export default function Home() {
  const { notas, erro, filtrarNotas, adicionarNota, excluirNota, editarNota } = useNotas();
  const { user } = useUser();
  const handleFiltrar = async (filtro?: string | null, ehFavorito?: boolean | null, cor?: string | null) => { 
    await filtrarNotas(ehFavorito, cor, filtro);
  };

  return (
    <>  
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        <PrivateRoute>
          <div className="container mx-auto p-4">
            {erro && <div className="text-red-500">{erro}</div>} 
             <div style={{ backgroundColor: '#f4f4f4', minHeight: '100vh' }}> 
              
              <FiltroNotas user={user} handleFiltrar={handleFiltrar}/>
                <Container style={{ marginTop: 20 }}>
                  <CriarNota addNote={adicionarNota} /> 
                  <Grid container spacing={3} style={{ marginTop: 20 }}>
                    {notas.map((nota) => (
                      <Grid item xs={12} sm={6} md={4} key={nota.id}>
                        <NotaCard note={nota} handleExcluir={excluirNota} handleEditar={editarNota} />
                      </Grid>
                    ))}
                  </Grid>
                </Container>
              </div>
          </div>
        </PrivateRoute> 
    </>
  );
}
