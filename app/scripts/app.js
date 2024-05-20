document.onreadystatechange = function () {
  if (document.readyState === "interactive") {
    app
      .initialized()
      .then(function (client) {
        client.events.on("app.activated", function () {
          onAppActivate(client);
        });
      })
      .catch(handleErr);
  }
};

async function onAppActivate(client) {
  const todos = prepareEntity(client);
  const todoForm = document.getElementById("todo-form");
  const todoTasks = document.getElementById("todo-tasks");

  todoForm.addEventListener("submit", handleSubmit(todos));
  todoTasks.addEventListener("fwChange", handleDone(todos));

  await updateList(todos);
}

function handleErr(err) {
  console.error(`Error occured. Details:`, err);
}

function handleSubmit(todos) {
  const todoInput = document.getElementById("todo-input");

  return async function _handleSubmit(evt) {
    evt.preventDefault();
    const inputVal = todoInput.value.trim();
    if (!inputVal) {
      todoInput.setAttribute("state", "warning");
      todoInput.setFocus();
      return;
    }
    try {
      const newtodo = await createToDo(todos, inputVal);
      console.log("New todo", newtodo);
      updatePendingList([newtodo.record]);
    } catch (e) {
      handleErr(e);
    }
    todoInput.setAttribute("state", "normal");
    todoInput.setAttribute("value", "");
    todoInput.setFocus();
  };
}

function handleDone(todos) {
  return async function _handleDone(evt) {
    try {
      const done = await markAsDone(todos, evt.target.name, evt.target.value);
      console.log("Done todo", done);
      updateDoneList([done.record]);
      evt.target.parentNode.removeChild(evt.target);
    } catch (e) {
      evt.preventDefault();
      handleErr(e);
    }
  };
}

async function updateList(todos) {
  try {
    const { pending, done } = await refreshList(todos);
    console.log("Pending", pending);
    console.log("Done", done);
    updatePendingList(pending.records.reverse());
    updateDoneList(done.records.reverse());
  } catch (e) {
    handleErr(e);
  }
}

function updatePendingList(records) {
  const todoTasks = document.getElementById("todo-tasks");
  for (const r of records) {
    const d = document.createElement("div");
    d.innerHTML = `
    <fw-checkbox name="${r.display_id}" value="${r.data.name}">${r.data.name}</fw-checkbox>
    `;
    todoTasks.appendChild(d);
  }
}

function updateDoneList(records) {
  const todoDone = document.getElementById("done-tasks");
  for (const r of records) {
    const d = document.createElement("div");
    d.innerHTML = `
    <fw-checkbox checked disabled name="${r.display_id}">${r.data.name}</fw-checkbox>
    `;
    todoDone.appendChild(d);
  }
}

// ----------------------------
// Custom Objects interactions
// ----------------------------

function prepareEntity(client) {
  const entity = client.db.entity({ version: "v1" });
  return entity.get("todos");
}

async function createToDo(todos, name) {
  return todos.create({ name, status: "ToDo" });
}

async function markAsDone(todos, todoId, name) {
  return todos.update(todoId, { name, status: "Done" });
}

async function refreshList(todos) {
  const pending = await todos.getAll({
    query: { status: "ToDo" },
  });
  const done = await todos.getAll({
    query: { status: "Done" },
  });
  return {
    pending,
    done,
  };
}