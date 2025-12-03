let shoppingList = [
  { name: "Хліб", quantity: 1, bought: false },
  { name: "Молоко", quantity: 2, bought: true },
  { name: "Яблука", quantity: 5, bought: false }
];

function printShoppingList(list) {
  const output = document.getElementById("shoppingOutput");
  let html = "<h2>Список:</h2>";

  html += "<h3>Не куплені:</h3>";
  html += "<ul>";
  list
    .filter(item => !item.bought)
    .forEach(item => {
      html += `
        <li class="item">
          ${item.name}, к-сть: ${item.quantity}
          <button onclick="buyItem('${item.name}')">Куплено</button>
        </li>
      `;
    });
  html += "</ul>";

  html += "<h3>Куплені:</h3>";
  html += "<ul>";
  list
    .filter(item => item.bought)
    .forEach(item => {
      html += `
        <li class="item bought">
          ${item.name}, к-сть: ${item.quantity}
        </li>
      `;
    });
  html += "</ul>";

  output.innerHTML = html;
}

function addPurchase(list, name, quantity) {
  const existingItem = list.find(
    item => item.name.toLowerCase() === name.toLowerCase()
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    list.push({
      name: name,
      quantity: quantity,
      bought: false
    });
  }
}

function buyItem(name) {
  const item = shoppingList.find(
    item => item.name.toLowerCase() === name.toLowerCase()
  );
  if (item) {
    item.bought = true;
    printShoppingList(shoppingList);
  } else {
    alert(`Товар "${name}" не знайдено у списку.`);
  }
}

function handleAdd() {
  const nameInput = document.getElementById("itemName");
  const quantityInput = document.getElementById("itemQuantity");

  const name = nameInput.value.trim();
  const quantity = parseInt(quantityInput.value, 10);

  if (!name) {
    alert("Введіть назву товару.");
    return;
  }
  if (isNaN(quantity) || quantity <= 0) {
    alert("Кількість має бути додатнім числом.");
    return;
  }

  addPurchase(shoppingList, name, quantity);
  printShoppingList(shoppingList);

  nameInput.value = "";
  quantityInput.value = 1;
}

window.onload = function() {
  printShoppingList(shoppingList);
};
