const onLoadUserInfo = () => {
  const email = localStorage.getItem("@WalletApp:userEmail");
  const name = localStorage.getItem("@WalletApp:userName");

  const navbarUserInfo = document.getElementById("navbar-user-container");
  const navbarUserAvatar = document.getElementById("navbar-user-avatar");

  //add user email
  const emailElement = document.createElement("p");
  const emailText = document.createTextNode(email);
  emailElement.appendChild(emailText);
  navbarUserInfo.appendChild(emailElement);

  //add logout link
  const logoutElement = document.createElement("a");
  const logoutText = document.createTextNode("sair");
  logoutElement.appendChild(logoutText);
  navbarUserInfo.appendChild(logoutElement);

  //add user first letter inside avatar
  const avatarElement = document.createElement("h3");
  const avatarText = document.createTextNode(name.toUpperCase().charAt(0));

  avatarElement.appendChild(avatarText);
  navbarUserAvatar.appendChild(avatarElement);
};

window.onload = () => {
  onLoadUserInfo();
};
