export interface Transacao {
  id: number;
  data: string;
  descricao: string;
  categoria_id: number;
  valor: number;
  tipo: 'entrada' | 'saida';
}

export interface ICategoria {
  id: string;
  descricao: string;
}

export interface AddRegisterModalProps {
  show: boolean;
  onClose: () => void;
  onNewTransaction: () => void;
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

export interface EditRegisterModalProps {
  show: boolean;
  onClose: () => void;
  onUpdate: () => void;
  currentRegister: Transacao | undefined;
}

export interface EditCategoria {
  id: number;
  descricao: string;
}

export interface AppRoutesProps {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

export interface ProtectedRouteProps {
  isAuthenticated: boolean;
  children: JSX.Element;
}

export type LoginError = {
  message: string;
};

export interface ConfirmDeletePopupProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export interface EditUserModalProps {
  show: boolean;
  onClose: () => void;
  onNameUpdate: (newName: string) => void;
}