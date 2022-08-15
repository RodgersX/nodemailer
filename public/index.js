const form = document.getElementById("contact-form");

const formEvent = form.addEventListener("submit", (event) => {
  event.preventDefault();

  let mail = new FormData(form);
  console.log(mail);
  sendMail(mail);
});

const sendMail = (mail) => {
  fetch("/send", { method: "POST", body: mail }).then((res) => {
    return res.json();
  });
};
