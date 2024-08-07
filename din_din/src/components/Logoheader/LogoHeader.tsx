import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getItem, removeItem, setItem } from "../../localStorage/localStorage";
import Logo from "../../assets/logo.svg";
import ExitIcon from "../../assets/logout-icon.svg";
import ProfilePic from "../../assets/perfilImage.png"; 
import "../../index.css";
import "./style.css";
import { HeaderLogoProps } from "../../Types/types";
import {EditUserModal} from "../editUserModal/EditUserModal";

export const HeaderLogo = ({ isLoggedIn }: HeaderLogoProps) => {
  const [logout, setLogout] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const navigate = useNavigate();
  const [name, setName] = useState<string>(getItem("name") || "");

  useEffect(() => {
    if (logout) {
      removeItem("token");
      removeItem("userId");
      removeItem("name");
      navigate("/");
    }
  }, [logout, navigate]);

  const handleProfilePicClick = () => {
    setShowEditModal(true);
  };

  const handleNameUpdate = (newName: string) => {
    setName(newName);
    setItem("name", newName); 
  };

  return (
    <header>
      <img src={Logo} alt="logo" style={{ width: "169px", height: "45px" }} />
      {isLoggedIn && (
        <div className="profile-area">
          <img src={ProfilePic} alt="Profile" className="profile-pic" onClick={handleProfilePicClick}/> 
          <strong>{name}</strong>
          <img src={ExitIcon} alt="Sair" onClick={() => setLogout(true)} />
        </div>
      )}
      {showEditModal && (
        <EditUserModal
          show={showEditModal}
          onClose={() => setShowEditModal(false)}
          onNameUpdate={handleNameUpdate}
        />
      )}
    </header>
  );
};