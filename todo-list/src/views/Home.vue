<template>
  <div class="main">
    <div class="container main-home">
      <div class="modal fade">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Confirmation</h5>
            </div>
            <div class="modal-body">
              <h4 class="text-center">Are you sure ?</h4>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="back()">Close</button>
              <button type="button" class="btn btn-primary" ref="confirm" @click="doAction()">Yes</button>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12 col-md-12 col-lg-12">
          <h2 class="text-center mt-2 mb-2">ToDo List</h2>
          <div class="col-sm-10 col-md-10 col-lg-10 offset-1 mb-2 p-0">
            <ul class="list-group" ref="todos">
              <li class="list-group-item" v-for="(todo, indexTodo) in listOfTasks" :key="todo.id">
                <div :class="{ overlay: todo.completed }">
                  <span v-if="todo.completed">Completed</span>
                </div>
                <h3 class="text-center m-2">{{ todo.name | capitalize }}</h3>
                <div class="form-check form-check-inline done-checkbox">
                  <input class="form-check-input" type="checkbox" id="done" @change="completedTodo(todo.id)">
                  <label class="form-check-label" for="done">Complete</label>
                </div>
                <div class="todo-time"> {{ todo.dates }}</div>
                <div class="rewrite">
                  <span class="adding-options" @click="setAdding(todo.id)" title="Add"></span>
                  <span class="delete-options" @click="showModal(indexTodo, 'delete-todo')" title="Delete"></span>
                </div>
                <ul class="custom-list">
                  <li class="custom-list-item" v-for="(task, indexTask) in todo.tasks" :key="task.id" :style="{background: todo.taskBg}">
                    <div :class="{ 'overlay-task': task.completed }">
                      <span v-if="task.completed">Completed</span>
                    </div>
                    <div class="form-check form-check-inline check-list-checkbox">
                      <input class="form-check-input task-check" type="checkbox" :data-id="todo.id" ref="funcCheck" title="Check Task" @change="getFunctional(task.id)">
                    </div>
                    <div class="todo-item" v-if="!task.editting">
                      {{ '-  ' + task.task }}
                    </div>
                    <div class="editting-area" v-else>
                      <input type="text" class="todo-item-edit" v-model="task.task"/>
                      <span class="save-task" title="Save" @click="saveEdittedTask(task.id)"></span>
                      <span class="cancel" title="Cancel" @click="showModal(task.id, 'cancel-edit')"></span>
                    </div>
                    <div class="variable-action" v-show="task.functional">
                      <span class="editting-task" @click="editTask(task)" title="Edit"></span>
                      <span class="deleting-task" @click="showModal(indexTask, 'delete-task')" title="Delete"></span>
                      <span class="complete-task"  @click="taskComplete(task.id)" title="Complete"></span>
                    </div>
                  </li>
                </ul>
                <div class="adding-area" v-if="todo.adding">
                  <input type="text" class="todo-item-add" v-model.lazy="newTask">
                  <span class="save-task" title="Save" @click="addAndSaveTask(todo.id)"></span>
                  <span class="cancel" title="Cancel" @click="cancelAdding(todo.id)"></span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'Home',
  props: ['confirmation'],
  data() {
    return {
      newTask: ''
    }
  },
  computed:{
    ...mapGetters(["listOfTasks"]),
  },
  methods: {
    deleteTodoList(id) {
        this.$store.dispatch("deleteTodo", id);
        this.back();
        if(this.$refs.todos.children.length == 1) {
          this.$router.push('/create');
        }
    },
    setAdding(id) {
      this.$store.dispatch("setAdding", id);
    },
    showModal(id, desc) {
      this.$refs.confirm.setAttribute('data-id', id);
      this.$refs.confirm.setAttribute('data-description', desc);
      this.$el.querySelector('.modal').classList.add('show');
      this.$el.querySelector('.modal').style.display = 'block';
    },
    doAction() {
      let description = event.target.dataset.description;
      let id = event.target.dataset.id;
      if (description == 'delete-todo') {
        this.deleteTodoList(id, this.eventLink);
      }
      if (description == 'delete-task') {
        this.deleteTask(id, this.eventLink);
      }
      if (description == 'cancel-edit') {
        this.cancelEdit(id);
      }
    },
    completedTodo(id) {
      this.$refs.funcCheck.forEach( el => {
        if(el.dataset.id == id) {
          el.checked = false;
        }
      });
      this.$store.dispatch("completedTodo", { checked: event.target.checked, id: id});
    },
    getFunctional(id) {
      this.$store.dispatch("setFunctional", {checked: event.target.checked, taskId: id});
    },
    editTask(task) {
      this.$store.dispatch("editTask", task);
    },
    saveEdittedTask(id) {
      this.$store.dispatch("saveEdittedTask", id);
    },
    cancelEdit(id) {
      this.$store.dispatch("cancelEdit", id);     
      this.back();
    },
    taskComplete(id) {
      event.target.previousSibling.style.order = 1;
      this.$store.dispatch("setTaskCompleted", id);
    },
    deleteTask(id) {
      this.$store.dispatch("deleteTask", id);
      this.back();
    },
    addAndSaveTask(id) {
      let taskObject = {};
        taskObject.task = [this.newTask];
        taskObject.completed = false;
        taskObject.functional = false;
        taskObject.editting = false;
        taskObject.id = Math.floor(Math.random() * 10000);

      this.$store.dispatch("addNewTask", {id: id, task: taskObject});
      this.newTask = '';
      this.cancelAdding(id);
    },
    cancelAdding(id) {
      this.$store.dispatch("cancelAdding", id);
    },
    back() {
      this.$el.querySelector('.modal').classList.remove('show');
      this.$el.querySelector('.modal').style.display = 'none';
    }
  },
  watch: {
    listOfTasks: data => {
      if(data.length == 0) {
        localStorage.removeItem('ToDo');
      }
    }
  },
  mounted() {
    if(localStorage.getItem('ToDo') == null) {
      this.$router.push('/create');
    }
  }
}
</script>

<style scoped>
.main {
  width: 100%;
  height: calc(100vh - 109.5px);
  overflow: auto;
}
.main-home {
  width: 100%;
  margin: 1% auto;
  background: #fff;
  border-radius: 4px;
}
.main-home h2 {
  text-align: center;
  font-size: 2em;
  font-weight: bold;
  font-family: 'Lato', sans-serif;
  border-bottom: 1px dotted #333;
}
.list-group {
  padding: 0;
}
.list-group-item {
  margin: 10px 0;
  border: 1px solid #111;
  border-radius: 4px;
}
.list-group-item + .list-group-item {
  border-top-width: 1px;
}
.modal {
  position: absolute;
  width: 100%; 
  height: 100%; 
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.5);
  z-index: 1000;
}
.modal-dialog {
  height: 100%;
}
.modal-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

}
.show {
  opacity: 1;
}
.overlay, .overlay-task {
  position: absolute;
  width: 100%; 
  height: 100%; 
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.5);
  border-radius: inherit;
  z-index: 4; 
}
.overlay-task {
  width: 96%;
  border-radius: inherit;
}
.overlay span, .overlay-task span {
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #ffffff71;
  font-size: 4em;
}
.overlay-task span {
  top: 40%;
  font-size: 1.3em;
  color: #ffffff23;

}
.custom-list {
  list-style: none;
  width: 100%;
  margin: 0;
  padding: 0;
}
.custom-list-item {
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 6px 12px;
  padding-left: 20px;
  margin: 4px 0;
  width: 100%;
  height: fit-content;
  font-size: 1.2em;
  color: #333
}
.done-checkbox {
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 5;
}
.todo-time {
  position: absolute;
  left: 20px;
  top: 24px;
  font-weight: 700;
  background-color: #176ae633;
  padding: 4px;
  border-radius: 4px;
}
.rewrite, .variable-action {
  position: absolute;
  right: 25px;
  top: 10px;
  width: 70px;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  align-items: center;
}
.variable-action {
  width: 80px;
  right: 10px;
  top: 50%;
  transform: translate(0, -50%);
}
.delete-options, .adding-options, .editting-task, .deleting-task, .complete-task, .save-task, .cancel {
  background-image: url("https://cdn0.iconfinder.com/data/icons/app-user-interface-5/48/trash-512.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  display: block;
  width: 30px;
  height: 30px;
  color: #111;
  cursor: pointer;
  transform-origin: 50% 100%;
  z-index: 5;
}
.adding-options {
  background-image: url("https://cdn3.iconfinder.com/data/icons/flat-circle-content/512/flat-style-circle-add-2-512.png");
  top: 15%;
  right: 7.5%;
  z-index: 1;
}
.editting-task, .deleting-task, .complete-task {
  background-image: url("https://cdn1.iconfinder.com/data/icons/website-internet/48/website_-_pencil-512.png");
  width: 20px;
  height: 20px;
  z-index: 1;
}
.deleting-task {
  background-image: url("https://cdn0.iconfinder.com/data/icons/app-user-interface-5/48/trash-512.png");
  z-index: 3;
}
.complete-task {
  background-image: url("https://cdn2.iconfinder.com/data/icons/greenline/512/check-512.png");
  z-index: 1;
}
.editting-area, .adding-area {
  width: 80%;
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
}
.adding-area {
  width: 90%;
  margin-top: 1%;
}
.todo-item {
  width: 86%;
  word-wrap: break-word;
  hyphens: none;
}
.todo-item-edit, .todo-item-add {
  width: 90%;
  border: none;
  border-bottom: 1px solid #333;
  background: inherit;
  caret-color: #265c45;
}
.todo-item-edit:focus, .todo-item-add:focus {
  outline: none;
}
.save-task, .cancel {
  background-image: url("https://cdn4.iconfinder.com/data/icons/feather/24/save-512.png");
  width: 20px;
  height: 20px;
  z-index: 1;
  margin: 0 5px;
}
.cancel {
  background-image: url("https://cdn2.iconfinder.com/data/icons/picol-vector/32/cancel-512.png");
}
</style>
