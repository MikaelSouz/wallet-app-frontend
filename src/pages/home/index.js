const renderFinancesList = (data) => {
  const table = document.getElementById("finances-table");
  table.innerHTML = "";
  const tableRow = document.createElement("tr");

  // title
  const titleHeader = document.createElement("th");
  const textTitleHeader = document.createTextNode("Título");
  titleHeader.className = "left";
  titleHeader.appendChild(textTitleHeader);
  tableRow.appendChild(titleHeader);

  // category
  const categoryHeader = document.createElement("th");
  const textCategoryHeader = document.createTextNode("Categoria");
  categoryHeader.appendChild(textCategoryHeader);
  tableRow.appendChild(categoryHeader);

  // date
  const dateHeader = document.createElement("th");
  const textDateHeader = document.createTextNode("Data");
  dateHeader.appendChild(textDateHeader);
  tableRow.appendChild(dateHeader);

  // value
  const valueHeader = document.createElement("th");
  const textValueHeader = document.createTextNode("Valor");
  valueHeader.appendChild(textValueHeader);
  tableRow.appendChild(valueHeader);

  // action
  const actionHeader = document.createElement("th");
  const textActionHeader = document.createTextNode("Ação");
  actionHeader.className = "right";
  actionHeader.appendChild(textActionHeader);
  tableRow.appendChild(actionHeader);

  table.appendChild(tableRow);

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

  // total
  const financeCard1 = document.getElementById("finance-card-1");
  financeCard1.innerHTML = "";

  const totalTextElement = document.createElement("h3");
  const totalText = document.createTextNode("Total de Lançamentos");
  totalTextElement.appendChild(totalText);
  financeCard1.appendChild(totalTextElement);

  const totalItemsElement = document.createElement("h1");
  const totalItemsText = document.createTextNode(totalItems);
  totalItemsElement.id = "total-element";
  totalItemsElement.appendChild(totalItemsText);
  financeCard1.appendChild(totalItemsElement);
  totalItemsElement.className = "mt-smaller";

  // revenue
  const financeCard2 = document.getElementById("finance-card-2");
  financeCard2.innerHTML = "";

  const revenueTextElement = document.createElement("h3");
  const revenueText = document.createTextNode("Receitas");
  revenueTextElement.appendChild(revenueText);
  financeCard2.appendChild(revenueTextElement);

  const revenuesElement = document.createElement("h1");
  const revenuesText = document.createTextNode(formatValue(revenues));
  revenuesElement.id = "revenue-element";
  revenuesElement.appendChild(revenuesText);
  financeCard2.appendChild(revenuesElement);
  revenuesElement.className = "mt-smaller";

  // expenses
  const financeCard3 = document.getElementById("finance-card-3");
  financeCard3.innerHTML = "";

  const expenseTextElement = document.createElement("h3");
  const expenseText = document.createTextNode("Despesas");
  expenseTextElement.appendChild(expenseText);
  financeCard3.appendChild(expenseTextElement);

  const expensesElement = document.createElement("h1");
  const expensesText = document.createTextNode(formatValue(expenses));
  expensesElement.id = "expenses-element";
  expensesElement.appendChild(expensesText);
  financeCard3.appendChild(expensesElement);
  expensesElement.className = "mt-smaller";

  // balance
  const financeCard4 = document.getElementById("finance-card-4");
  financeCard4.innerHTML = "";

  const balancesTextElement = document.createElement("h3");
  const balancesText = document.createTextNode("Balanço");
  balancesTextElement.appendChild(balancesText);
  financeCard4.appendChild(balancesTextElement);

  const balanceElement = document.createElement("h1");
  const balanceText = document.createTextNode(formatValue(totalValue));
  balanceElement.id = "balance-element";
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

const onOpenModal = () => {
  const modal = document.getElementById("modal");
  modal.style.display = "flex";
};

const onCloseModal = () => {
  const modal = document.getElementById("modal");
  modal.style.display = "none";
};

const onLoadCategories = async () => {
  try {
    const categoriesSelect = document.getElementById("input-category");
    const response = await fetch(
      "https://mp-wallet-app-api.herokuapp.com/categories"
    );

    const categoriesResult = await response.json();

    categoriesResult.map((category) => {
      const option = document.createElement("option");
      const categoryText = document.createTextNode(category.name);
      option.id = `category_${category.id}`;
      option.value = category.id;
      option.appendChild(categoryText);
      categoriesSelect.appendChild(option);
    });
  } catch (error) {
    alert("Erro ao carregar categorias.");
  }
};

const onCallAddFinance = async (data) => {
  try {
    const email = localStorage.getItem("@WalletApp:userEmail");

    const response = await fetch(
      "https://mp-wallet-app-api.herokuapp.com/finances",
      {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          email: email,
        },
        body: JSON.stringify(data),
      }
    );

    const user = await response.json();

    return user;
  } catch (error) {
    return { error };
  }
};

const onCreateFinanceRelease = async (target) => {
  try {
    const title = target[0].value;
    const value = Number(target[1].value);
    const date = target[2].value;
    const category = Number(target[3].value);
    const result = await onCallAddFinance({
      title,
      value,
      date,
      category_id: category,
    });

    if (result.error) {
      alert("Erro ao adicionar novos dados.");
      return;
    }
    onCloseModal();
    onLoadFinancesData();
  } catch (error) {
    alert("Erro ao adicionar novos dados.");
  }
};

window.onload = () => {
  onLoadUserInfo();
  onLoadFinancesData();
  onLoadCategories();

  const form = document.getElementById("form-finance-release");
  form.onsubmit = (event) => {
    event.preventDefault();
    onCreateFinanceRelease(event.target);
  };
};
