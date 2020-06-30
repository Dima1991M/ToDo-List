<template>
 <div class="container main-create" @keyup.enter="createList()">
     <div class="row">
        <div class="col-sm-12 col-md-12 col-lg-12 mb-3">
            <h2 class="m-3">Create your own ToDo List !</h2>
        </div>
        <div class="col-sm-12 col-md-12 col-lg-12">
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="input-name">Todo List Name</span>
                </div>
                <input type="text" class="form-control" aria-label="Default" aria-describedby="input-name" v-model="nameList">
            </div>
            <div class="row">
                <div class="col-sm-4 col-md-4 col-lg-4">
                    <select class="form-control form-control-sm mb-3" name="year" id="year" @change="selectValue()" v-model="chooseDate.year">
                        <option disabled value="">Select year</option>
                        <option v-for="year in years" :key="year.id" :value="year">
                            {{ year }}
                        </option>
                    </select>
                </div>
                <div class="col-sm-4 col-md-4 col-lg-4">
                    <select class="form-control form-control-sm mb-3" name="month" id="month" @change="selectValue()" v-model="chooseDate.month">
                        <option disabled value="">Select month</option>
                        <option v-for="(month, id) in months" :key="month.id" :value="id">
                            {{ month }}
                        </option>
                    </select>
                </div>
                <div class="col-sm-4 col-md-4 col-lg-4">
                    <select class="form-control form-control-sm mb-3" name="day" id="day" v-model="chooseDate.day">
                        <option disabled value="">Select day</option>
                        <option v-for="day in days" :key="day.id" :value="day">
                            {{ day }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-12 col-md-12 col-lg-12" ref="tasks">
                    <h4 class="text-center">Tasks</h4>
                    <input type="text" class="form-control form-control-sm mb-3" placeholder="ToDo List Task - 1" :style="{ background: taskColor }">
                    <div class="added-list" ref="taskField"></div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row m-0">
                <div class="col-sm-6 col-md-6 col-lg-6 offset-5 color-choice">
                    <label for="color">Set Tasks Color: </label>
                    <input type="color" class="form-control form-control-sm" value="#ffffff" v-model="taskColor" @change="setTaskBgColor()">
                </div>
                <div class="col-sm-6 col-md-6 col-lg-6">
                    <a href="#" class="remove-task" @click.prevent="removeLastTask()" title="Remove"> 
                        <span class="custom-icon"> - </span>
                    Remove last task</a>
                </div>
                <div class="col-sm-6 col-md-6 col-lg-6">
                <a href="#" class="add-task" @click.prevent="addTask()" title="Add"> 
                        <span class="custom-icon"> + </span>
                    Add new task </a>
                </div>
            </div>
        </div>
        <div class="col-sm-12 col-md-12 col-lg-12">
            <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                <div class="btn-group m-3" role="group" aria-label="Third group">
                    <button type="button" class="btn btn-danger" @click="clearInputs()">Clear all Inputs</button>
                </div>
                <div class="btn-group m-3" role="group" aria-label="Third group">
                    <button type="submit" class="btn btn-primary" @click="createList()">Create ToDo List</button>
                </div>
            </div>
        </div>
     </div>
 </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'Create',
    data() {
        return{
            months: {1:'January', 2:'February', 3:'March',4: 'April', 5:'May', 6: 'June',7: 'July', 8: 'August', 9: 'September', 10: 'October',11: 'November', 12: 'December'},
            days: [],
            years: [2020, 2021, 2022, 2023],
            chooseDate: {
                day: '' || new Date().getDate() + 1,
                month: '' || new Date().getMonth() + 1,
                year: '' || new Date().getFullYear()
            },
            getTasks: [],
            nameList: '',
            taskColor: '#ffffff'
        }
    },
    computed: {
        ...mapGetters(["counter"]),
    },
    methods: {
        createList() {
            if(this.$refs.tasks.querySelectorAll('input')[0].value) {
                this.$refs.tasks.querySelectorAll('input').forEach( el => {
                    if(el.value) {
                        let taskObject = {};
                        taskObject.task = [el.value];
                        taskObject.completed = false;
                        taskObject.functional = false;
                        taskObject.editting = false;
                        taskObject.id = Math.floor(Math.random() * 10000);
                        this.getTasks.push(taskObject);
                    }
                });
                let todoListArray = 
                    {
                        id: Math.floor(Math.random() * 10000),
                        name: this.nameList,
                        dates: `${this.chooseDate.day} ${this.months[this.chooseDate.month]}, ${this.chooseDate.year} `,
                        tasks: this.getTasks,
                        taskBg: this.taskColor,
                        completed: false,
                        adding: false
                    };
                if(this.nameList && this.getTasks) {
                    this.$store.dispatch("saveTodo", todoListArray);
                    this.getTasks = [];
                }

                if(this.$refs.taskField.childNodes.length) {
                    while(this.$refs.taskField.firstChild) {
                        this.$refs.taskField.firstChild.remove();
                    }
                    this.$store.commit('returnCounter');
                }
                this.clearInputs();
                this.$router.push('/home');
            }
        },
        clearInputs() {
            this.$el.querySelectorAll('input[type=text]').forEach( el => {
                this.taskColor = '#ffffff';
                el.value = '';
            }); 
        },
        addTask() {
            let fieldToAdd = this.$refs.taskField;

            if(this.counter < 11) {
                let inputElement = document.createElement('input');
                inputElement.setAttribute('type', 'text');
                inputElement.classList.add('form-control','form-control-sm', 'mb-3');
                inputElement.setAttribute('placeholder', 'ToDo List Task - ' + this.counter);
                fieldToAdd.append(inputElement);
                this.$store.commit('plusCounterTask');
            }
        },
        removeLastTask() {
            let taskList = this.$el.querySelector('.added-list');
            if(taskList.childNodes.length){
                taskList.lastChild.remove();
                this.$store.commit('minusCounterTask');
            }
        },
        selectValue() {
            let year = new Date().getFullYear();
            let month = new Date().getMonth();
            if(event.target.id == 'year' || event.target.id == 'month') {
                let days = 32 - new Date(event.target.value || year, (event.target.value - 1) || month, 32).getDate();
                this.days = [];
                let n = 1
                event.target.value == 1 ? n++ : n;
                for(let i = 1; i < days + n; i++) {
                    this.days.push(i);
                }
            }
        },
        setTaskBgColor() {
            this.$refs.tasks.querySelectorAll('input').forEach( el => {
                el.style.background = event.target.value;
            });
        }
    },
    mounted() {
        let year = new Date().getFullYear();
        let month = new Date().getMonth();
        let days = 32 - new Date(year, month, 32).getDate();
        this.days = [];
        for(let i = 1; i < days + 1; i++) {
            this.days.push(i);
        }
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lato&display=swap');
.main-create {
    width: 100%;
    margin: 1% auto;
    background: #fff;
    border-radius: 4px;
}
.main-create h2 {
    text-align: center;
    font-size: 2em;
    font-weight: bold;
    font-family: 'Lato', sans-serif;
    border-bottom: 1px dotted #333;
}
.btn-toolbar {
    justify-content: center;
}
.add-task, .remove-task {
    margin: 10px 50px;
    text-decoration: none;
    font-size: 1.3em;
    font-weight: bold;
}
.add-task {
    float: right;
}
.remove-task {
    float: left;
}
.custom-icon {
    font-size: 1.4em;
}
.add-task:hover {
    color: #0cc9a9;
}
.remove-task:hover {
    color: #dc3545;
}

.delete-options{
    background-image: url("https://cdn4.iconfinder.com/data/icons/green-green/32/expand-color-web2-10-512.png");
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    position: absolute;
    display: block;
    z-index: 100;
    top: 15%;
    right: 3%;
    width: 30px;
    height: 30px;
    color: #111;
    cursor: pointer;
    transform-origin: 50% 100%;
}

.color-choice {
    max-width: 210px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
    align-items: center;
}
.color-choice label {
    font-size: 0.7em;
    font-weight: 700;
}
.color-choice input {
    width: 50%;
    padding: 2px;
}
</style>