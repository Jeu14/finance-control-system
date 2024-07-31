import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../index.css";
import "./style.css";
import { FilterButton } from "../../components/filterbutton/FilterButton";
import { HeaderLogo } from "../../components/Logoheader/LogoHeader";
import { ResumeTable } from "../../components/resumetable/ResumeTable";
import { Tabela } from "../../components/table/tabela";
import { getItem } from "../../localStorage/localStorage";
import { Transacao } from "../../Types/types";

export const Home = () => {
  const [addRegister, setAddRegister] = useState<boolean>(false);
  const [editRegister, setEditRegister] = useState<boolean>(false);
  const [currentRegister, setCurrentRegister] = useState<Transacao | undefined>(undefined);
  const [transacao, setTransacao] = useState<Transacao[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="background">
      <HeaderLogo isLoggedIn={true} />
      <main className="main-home">
        <div className="container-description">
          <FilterButton />
          <div className="description">
            <Tabela
              transacao={transacao}
              setTransacao={setTransacao}
              setCurrentRegister={setCurrentRegister}
              setEditRegister={setEditRegister}
            />
            <div className="container-resume">
              <ResumeTable transacao={transacao} />
              <button onClick={() => setAddRegister(true)}>
                Adicionar Registro
              </button>
              

            </div>
          </div>
        </div>
      </main>
    </div>
  );
};