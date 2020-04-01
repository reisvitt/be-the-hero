import React, { useEffect, useState } from "react";
import { FiPower, FiTrash2 } from "react-icons/fi";
import { Link, useHistory } from "react-router-dom";
import "./styles.css";

import api from "../../services/api";

import logoImg from "../../assets/logo.svg";

const Profile = () => {
  const [incidents, setIncidents] = useState([]);
  const ongName = localStorage.getItem("ongName");
  const ongId = localStorage.getItem("ongId");

  const history = useHistory();

  useEffect(() => {
    api
      .get("/profile", {
        headers: { Authorization: ongId }
      })
      .then(response => {
        setIncidents(response.data);
      });
  }, [ongId]);

  async function handleDeleteIncident(id) {
    try {
      api
        .delete(`/incidents/${id}`, {
          headers: {
            Authorization: ongId
          }
        })
        .then(() => {
          setIncidents(incidents.filter(incident => incident.id !== id));
        });
    } catch (err) {
      alert("Erro ao tentar deletar caso, tente novamente");
    }
  }

  function handleLogout() {
    localStorage.clear();
    history.push("/");
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Hero" />
        <span>Bem vinda, {ongName}</span>

        <Link className="button" to="/incidents/new">
          Cadastrar novo caso
        </Link>
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#e04041" />
        </button>
      </header>

      <h1>Casos cadastrados</h1>

      <ul>
        {incidents.map(incident => (
          <li key={incident.setIncidents}>
            <strong>CASO: </strong>
            <p>{incident.title}</p>

            <strong>DESCRIÇÃO</strong>
            <p>{incident.description}</p>

            <strong>VALOR:</strong>
            <p>
              R${" "}
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL"
              }).format(incident.value)}
            </p>

            <button
              onClick={() => handleDeleteIncident(incident.id)}
              type="button"
            >
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
