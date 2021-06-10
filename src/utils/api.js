const host = "http://candango.ngrok.io/api/candango";


export const
  login = (email, senha) =>
    fetch(`${host}/signin`, {
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
    fetch(`${host}/signup`, {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "nme_usuario": name,
        "gen_usuario": gender,
        "tlf_usuario": phone,
        "eml_usuario": email,
        "pwd_usuario": password,
        "est_usuario": state,
        "pais_usuario": country,
      })
    })
    .then(response => response.json())
    .catch(err => console.error(err)),

  recoverPassword = eml_usuario =>
    fetch(`${host}/user/forgotPassword`, {
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
    fetch(`${host}/user/changePassword`, {
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
    fetch(`${host}/pontos-turisticos`, {
      method: "GET",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .catch(err => console.error(err)),

  getCircuits = () =>
    fetch(`${host}/circuitos`, {
      method: "GET",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .catch(err => console.error(err)),

  getMedals = () =>
    fetch(`${host}/medalhas`, {
      method: "GET",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .catch(err => console.error(err)),

  getUserMedals = (id) =>
    fetch(`${host}/medalhas-usuario`, {
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