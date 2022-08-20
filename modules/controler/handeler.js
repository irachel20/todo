const title = document.getElementById("title");
const desc = document.getElementById("desc");
const main = document.getElementById("main");
import { myAlertt } from "./../components/alert.js";

function getLocatedTodos() {
  const savedTodos = localStorage.getItem("todosList");
  return JSON.parse(savedTodos)?.sort((a, b) => a.id - b.id) || [];
}

let saveTodos = [...getLocatedTodos()];

const createNewTodo = (title, desc, id, checked) => {
  const li = document.createElement("li");

  const h3 = document.createElement("h3");
  h3.style.display = "flex";

  const todoTitleInput = document.createElement("input");
  todoTitleInput.defaultValue = title;
  todoTitleInput.className = "todo-title-input";
  todoTitleInput.style.width = "100%";
  todoTitleInput.style.color = "#212121";
  const todoDescInput = document.createElement("input");
  todoDescInput.className = "todo-title-input";
  todoDescInput.defaultValue = desc;
  todoDescInput.style.width = "100%";

  h3.appendChild(todoTitleInput);

  li.appendChild(h3);
  const p = document.createElement("p");
  p.style.color = "#212121";

  p.appendChild(todoDescInput);

  li.appendChild(p);

  const checkMark = document.createElement("span");
  checkMark.innerHTML = "✔";
  checkMark.style.marginRight = "0.5rem";
  checkMark.style.color = "#f9aa33";
  h3.style.marginBottom = "0rem";

  const edit = document.createElement("button");
  edit.innerText = "edit";
  edit.style.marginRight = "1rem";
  edit.style.border = "0.1rem solid #616161ac";
  edit.style.borderRadius = "0.5rem";
  edit.style.paddingLeft = "1rem";
  edit.style.paddingRight = "1rem";
  edit.style.marginBottom = "3rem";
  edit.style.background = "transparent";
  edit.setAttribute('data-id' , id);
  

  const del = document.createElement("button");
  del.innerHTML = "delete";
  del.style.marginRight = "1rem";
  del.style.border = "0.1rem solid #616161ac";
  del.style.borderRadius = "0.5rem";
  del.style.paddingLeft = "1rem";
  del.style.paddingRight = "1rem";
  del.style.marginBottom = "3rem";
  del.style.background = "transparent";
  del.setAttribute('data-id' , id);
  

  const check = document.createElement("button");
  check.innerHTML = "check";
  check.style.border = "0.1rem solid #616161ac";
  check.style.borderRadius = "0.5rem";
  check.style.paddingLeft = "1rem";
  check.style.paddingRight = "1rem";
  check.style.marginBottom = "3rem";
  check.style.background = "transparent";
  check.setAttribute('data-id' , id);


  li.appendChild(edit);
  li.appendChild(del);
  li.appendChild(check);

  if (checked) {
    h3.appendChild(checkMark);
    todoTitleInput.style.textDecorationLine = "line-through";
  }

  main.appendChild(li);
};
function renderTodoElements() {
  getLocatedTodos().forEach((todo) =>
    createNewTodo(todo.todoTitle, todo.todoDesc, todo.id, todo.checked)
  );
}
renderTodoElements();
export function handeler() {
  if (!title.value)
    return myAlertt("please inter atleast a title for your todo", {
      time: 5000,
      type: "warn",
    });

  const newTodo = {
    id: Date.now(),
    todoTitle: title.value,
    todoDesc: desc.value,
    checked: false,
  };

  saveTodos.push(newTodo);

  localStorage.setItem("todosList", JSON.stringify(saveTodos));

  createNewTodo(newTodo.todoTitle, newTodo.todoDesc, newTodo.id);

  if (title.value)
    return myAlertt("everything is saved successfully", {
      time: 5000,
      type: "success",
    });
}

main.addEventListener("click", (e) => {
  const id = e.target.dataset.id;
  if (e.target.innerText === "delete") {
    const filteredTodos = getLocatedTodos().filter(
      (item) => item.id !== Number(id)
    );
    localStorage.setItem("todosList", JSON.stringify(filteredTodos));
    main.innerHTML = "";
    renderTodoElements();
  } else if (e.target.innerText === "check") {
    const filteredTodo = getLocatedTodos().filter(
      (item) => item.id === Number(id)
    );
    const updateFilteredTodo = {
      ...filteredTodo[0],
      checked: true,
    };
    const filteredTodos = getLocatedTodos().filter(
      (item) => item.id !== Number(id)
    );
    const updateSavedTodo = [...filteredTodos, updateFilteredTodo];

    localStorage.setItem("todosList", JSON.stringify(updateSavedTodo));
    main.innerHTML = "";
    renderTodoElements();
  } else if (e.target.innerText === "edit") {
    const todoEl = e.target.parentElement;

    todoEl.children[1].children[0].disabled = false;
    todoEl.children[0].children[0].disabled = false;
    todoEl.children[0].children[0].select();

    e.target.innerText = "save";
    e.target.addEventListener("click", () => {
      const filteredTodo = getLocatedTodos().filter(
        (item) => item.id === Number(id)
      );

      const updateFilteredTodo = {
        ...filteredTodo[0],
        todoTitle: todoEl.children[0].children[0].value,
        todoDesc: todoEl.children[1].children[0].value,
      };

      const filteredTodos = getLocatedTodos().filter(
        (item) => item.id !== Number(id)
      );

      const updateSavedTodo = [...filteredTodos, updateFilteredTodo];

      localStorage.setItem("todosList", JSON.stringify(updateSavedTodo));
      main.innerHTML = "";
      renderTodoElements();
    });
  }
});
