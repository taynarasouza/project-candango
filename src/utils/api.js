const host = "http://candango.com/api";


export const
  login = (email, senha) =>
    fetch(`${host}/candango/signin`, {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "eml_usuario": email, // "admin@gmail.com",
        "pwd_usuario": senha  // "adminroot"
      })
    })
    .then(response => {
      if (!response || response == null)
        return {
          status: -1,
          msg: "Erro ao efetuar login"
        };

      return response.json();
    })
    .catch(err => console.error(err)),

  cadastrar = (name, gender, phone, email, password, state, country) =>
    fetch(`${host}/candango/signup`, {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "nme_usuario": name,
        "eml_usuario": email,
        "pwd_usuario": password,
        "tlf_usuario": phone,
        "gen_usuario": gender,
        "est_usuario": state,
        "pais_usuario": country,
      })
    })
    .then(response => response.json())
    .catch(err => console.error(err)),

  recoverPassword = eml_usuario =>
    fetch(`${host}/candango/forgotPassword`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        eml_usuario
      })
    })
      .then(response => response.json())
      .catch(err => console.error(err)),

  changePassword = (eml_usuario, cod_recuperar_senha, nova_senha) =>
    fetch(`${host}/candango/changePassword`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        eml_usuario,
        cod_recuperar_senha,
        nova_senha
      })
    })
    .then(response => response.json())
    .catch(err => console.error(err)),

  getPoints = () =>
    fetch(`${host}/candango/pontos-turisticos`, {
      method: "GET",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .catch(err => console.error(err)),

  getCircuits = () =>
    fetch(`${host}/candango/circuitos`, {
      method: "GET",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .catch(err => console.error(err)),

  getMedals = () =>
    fetch(`${host}/candango/medalhas`, {
      method: "GET",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .catch(err => console.error(err)),

  getUserMedals = (id) =>
    fetch(`${host}/candango/medalhas-usuario`, {
      method: "POST",
      body: JSON.stringify({idtUsuario: id}),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .catch(err => console.error(err))
;