const myAlert = document.getElementById("alert");
const close = document.getElementById("close");

export const myAlertt = (msg, options) => {
  myAlert.style.right = "0%";

  switch (options.type) {
    case "warn":
      myAlert.style.backgroundColor = "#f9aa3350";
      break;
    case "error":
      myAlert.style.backgroundColor = " rgba(186, 109, 125, 0.219)";
      break;
    case "success":
      myAlert.style.backgroundColor = "rgba(148, 173, 167, 0.450)";
      break;
    default:
      myAlert.style.backgroundColor = " rgba(104, 161, 186, 0.219)";
      break;
  }

  myAlert.children[0].innerHTML = msg;
  setTimeout(function () {
    myAlert.style.right = "-100%";
  }, options.time || 3000);
};

const closingAlert = () => {
  myAlert.style.right = "-100%";
};

close.addEventListener("click", closingAlert);
