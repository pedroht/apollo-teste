import { useNavigate } from 'react-router-dom';

import { Button } from '../../components/ui/button';

export function Home() {
  const navigate = useNavigate();

  function handleNavigation() {
    navigate('/products');
  }

  return (
    <div className="h-screen w-screen">
      <div className="flex h-full flex-col items-center justify-center space-y-8">
        <div>
          <h2 className="text-center text-2xl font-bold tracking-tight">
            Projeto FullStack Junior
          </h2>
          <p className="text-center text-muted-foreground">
            Cadastro de Produtos
          </p>
        </div>

        <Button onClick={handleNavigation}>Entrar</Button>
      </div>
    </div>
  );
}
