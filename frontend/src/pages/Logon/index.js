import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import "./styles.css";

import api from "../../services/api";

import heroImg from "../../assets/heroes.png";
import logoImg from "../../assets/logo.svg";

const Logon = () => {
  const [id, setId] = useState("");
  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await api.post("/sessions", { id });

      console.log(response.data.name);

      localStorage.setItem("ongId", id);
      localStorage.setItem("ongName", response.data.name);

      history.push("/profile");
    } catch (err) {
      alert("Falha no login, tente novamente.");
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Be The Hero" />

        <form onSubmit={handleLogin}>
          <h1>Faça seu logon</h1>
          <input
            value={id}
            onChange={e => setId(e.target.value)}
            placeholder="Sua ID"
          />
          <button className="button" type="submit">
            Entrar
          </button>

          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#E02041" />
            Não tem cadastro
          </Link>
        </form>
      </section>
      <img src={heroImg} alt="Heroes" />
    </div>
  );
};

export default Logon;
