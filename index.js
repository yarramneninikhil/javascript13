const form = document.querySelector(".myform");

// Function to create a list item and add it to the list
function createListItem(desc, amount, category) {
  const ele = document.createElement("li");
  ele.textContent = desc;
  const ele1 = document.createElement("li");
  ele1.textContent = `--- ${amount} ${category}`;
  const del = document.createElement("button");
  del.textContent = "DeleteExpense";
  const edit = document.createElement("button");
  edit.textContent = "EditExpense";
  ele1.appendChild(del);
  ele1.appendChild(edit);
  ele1.style.display = "inline-block";
  ele.appendChild(ele1);
  form.appendChild(ele);

  del.addEventListener("click", () => {
    const val = del.parentElement.parentElement;
    localStorage.removeItem(desc);
    val.remove();
  });

  edit.addEventListener("click", () => {
    const d = edit.parentElement.parentElement;
    const val = d.firstChild.textContent;
    const newobj = JSON.parse(localStorage.getItem(desc));
    localStorage.removeItem(desc);
    d.remove();
    document.querySelector("#amount").value = newobj.amount;
    document.querySelector("#desc").value = desc;
    document.querySelector("#category").value = newobj.category;
  });
}

// Load and display data when the page is loaded
window.addEventListener("load", () => {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = JSON.parse(localStorage.getItem(key));
    createListItem(key, value.amount, value.category);
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const amount = document.querySelector("#amount").value;
  const desc = document.querySelector("#desc").value;
  const category = document.querySelector("#category").value;
  let obj = {
    amount,
    category,
  };
  localStorage.setItem(desc, JSON.stringify(obj));
  createListItem(desc, amount, category);
});
