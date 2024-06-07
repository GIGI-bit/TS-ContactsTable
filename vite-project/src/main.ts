import "./_styles.scss";
import { Contact } from "./contact";

const form = document.getElementById("contact-form");
form?.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.querySelector("#name") as HTMLInputElement;
  const email = document.querySelector("#email") as HTMLInputElement;
  const phone = document.querySelector("#phone") as HTMLInputElement;
  if (!localStorage.getItem("contacts")) {
    let arr: Contact[] = [];
    arr.push();
    localStorage.setItem("contacts", JSON.stringify(arr));
  } else {
    try {
      const str = localStorage.getItem("contacts");
      let arr = str ? JSON.parse(str) : [];
      if (
        name.value.length >= 2 &&
        email.value.includes("@") &&
        phone.value.includes("+") &&
        phone.value.length >= 7
      ) {
        arr.push(new Contact(name.value, email.value, phone.value));
        localStorage.removeItem("contacts");
        localStorage.setItem("contacts", JSON.stringify(arr));
      }
    } catch (error) {
      console.log("Error");
    }
  }
  const str = localStorage.getItem("contacts");
  const tableArr: Contact[] = str ? JSON.parse(str) : [];
  tableArr.forEach((element) => {
    const tableBody = document.querySelector("#contact-table tbody");
    const newRow = document.createElement("tr");
    newRow.innerHTML = `<td>${element.name}</td>
    <td>${element.email}</td>
    <td>${element.phone}</td>
    `;
    tableBody?.appendChild(newRow);
  });
});
