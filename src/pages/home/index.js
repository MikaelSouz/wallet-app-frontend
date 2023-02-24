const renderFinancesList = (data) => {
  const table = document.getElementById("finances-table");

  data.map((item) => {
    const tableRow = document.createElement("tr");

    // title
    const titleTd = document.createElement("td");
    const titleText = document.createTextNode(item.title);
    titleTd.appendChild(titleText);
    tableRow.appendChild(titleTd);
    titleTd.className = "left";

    // category
    const categoryTd = document.createElement("td");
    const categoryText = document.createTextNode(item.name);
    categoryTd.appendChild(categoryText);
    tableRow.appendChild(categoryTd);

    // date
    const dateTd = document.createElement("td");
    const dateText = document.createTextNode(
      new Date(item.date).toLocaleDateString()
    );
    dateTd.appendChild(dateText);
    tableRow.appendChild(dateTd);

    // value
    const valueTd = document.createElement("td");
    const valueText = document.createTextNode(formatValue(item.value));
    valueTd.appendChild(valueText);
    tableRow.appendChild(valueTd);

    // delete
    const deleteTd = document.createElement("td");
    const deleteText = document.createTextNode("deletar");
    deleteTd.appendChild(deleteText);
    tableRow.appendChild(deleteTd);
    deleteTd.className = "right";

    // table add tablerow
    table.appendChild(tableRow);
  });
};

const formatValue = (number) => {
  const value = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(number);

  return value;
};

const renderFinanceElements = (data) => {
  const totalItems = data.length;
  const revenues = data
    .filter((item) => Number(item.value) > 0)
    .reduce((acc, item) => acc + Number(item.value), 0);
  const expenses = data
    .filter((item) => Number(item.value) < 0)
    .reduce((acc, item) => acc + Number(item.value), 0);

  const totalValue = revenues + expenses;

  const financeCard1 = document.getElementById("finance-card-1");
  const totalItemsElement = document.createElement("h1");
  const totalItemsText = document.createTextNode(totalItems);
  totalItemsElement.appendChild(totalItemsText);
  financeCard1.appendChild(totalItemsElement);
  totalItemsElement.className = "mt-smaller";

  const financeCard2 = document.getElementById("finance-card-2");
  const revenuesElement = document.createElement("h1");
  const revenuesText = document.createTextNode(formatValue(revenues));
  revenuesElement.appendChild(revenuesText);
  financeCard2.appendChild(revenuesElement);
  revenuesElement.className = "mt-smaller";

  const financeCard3 = document.getElementById("finance-card-3");
  const expensesElement = document.createElement("h1");
  const expensesText = document.createTextNode(formatValue(expenses));
  expensesElement.appendChild(expensesText);
  financeCard3.appendChild(expensesElement);
  expensesElement.className = "mt-smaller";

  const financeCard4 = document.getElementById("finance-card-4");
  const balanceElement = document.createElement("h1");
  const balanceText = document.createTextNode(formatValue(totalValue));
  balanceElement.appendChild(balanceText);
  financeCard4.appendChild(balanceElement);
  balanceElement.className = "mt-smaller";
  balanceElement.style.color = "#5936cd";
};

const onLoadFinancesData = async () => {
  try {
    const date = "2022-12-15";
    const email = localStorage.getItem("@WalletApp:userEmail");
    const result = await fetch(
      `https://mp-wallet-app-api.herokuapp.com/finances?date=${date}`,
      {
        method: "GET",
        headers: {
          email: email,
        },
      }
    );

    const data = await result.json();
    renderFinanceElements(data);
    renderFinancesList(data);

    return data;
  } catch (error) {
    return { error };
  }
};

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
  onLoadFinancesData();
};
