import React from "react";
import "./ConfirmDeletePopup.css";
import { ConfirmDeletePopupProps } from "../../Types/types";

export const ConfirmDeletePopup: React.FC<ConfirmDeletePopupProps> = ({ onConfirm, onCancel }) => {
  return (
    <div className="confirm-delete-popup">
      <p>Apagar Item?</p>
      <div className="popup-buttons">
        <button className="popup-buttonYes" onClick={onConfirm}>Sim</button>
        <button className="popup-buttonNo" onClick={onCancel}>Não</button>
      </div>
    </div>
  );
};