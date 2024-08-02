export interface Transacao {
  id: number;
  data: string;
  descricao: string;
  categoria: string;
  valor: number;
  tipo: 'entrada' | 'saida';
}

export interface HeaderLogoProps {
  isLoggedIn: boolean;
}

export interface LoginProps {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

export interface TabelaProps {
  transacao: Transacao[];
  setTransacao: React.Dispatch<React.SetStateAction<Transacao[]>>;
  setEditRegister: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentRegister: React.Dispatch<React.SetStateAction<Transacao | undefined>>;
}

export interface ResumeTableProps {
  transacao: Transacao[];
}