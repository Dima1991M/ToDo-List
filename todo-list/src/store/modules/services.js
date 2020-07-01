
export default {
    actions: {
        saveTodo(ctx, todos) {
            ctx.commit("getUserData", todos);
        },
        completedTodo(ctx, args) {
            ctx.commit("setCompleteTodo", args);
        },
        setFunctional(ctx, args) {
            ctx.commit("setFunctionalTask", args);
        },
        editTask(ctx, task) {
            ctx.commit("changeEditting", task);
        },
        saveEdittedTask(ctx, id) {
            ctx.commit("saveEdittedTask", id);
        },
        cancelEdit(ctx, id) {
            ctx.commit("cancelEditting", id);
        },
        setTaskCompleted(ctx, id) {
            ctx.commit("setTaskCompleted", id);
        },
        deleteTask(ctx, id) {
            ctx.commit("deleteTask", id);
        },
        addNewTask(ctx, args) {
            ctx.commit("addNewTask", args);
        },
        deleteTodo(ctx, id) {
            ctx.commit("deleteTodo", id);
        },
        setAdding(ctx, id) {
            ctx.commit("setAdding", id);
        },
        cancelAdding(ctx, id) {
            ctx.commit("cancelAdding" , id);
        },
        cancelTaskComplete(ctx, id) {
            ctx.commit("cancelTaskComplete", id);
        }
    },
    mutations: {
        plusCounterTask(state) {
            state.countTask++;
        },
        minusCounterTask(state) {
            state.countTask--;
        },
        returnCounter(state) {
            state.countTask = 2;
        },
        getUserData(state, todoList) {
            state.listTask.push(todoList);
        },
        setCompleteTodo(state, args) {
            for(let key of state.listTask) {
                if(args.id == key.id) {
                    key.completed = args.checked;
                    for(let item of key.tasks) {
                        item.completed = false;
                        item.functional = false;
                    }
                }
            }
        },
        setFunctionalTask(state, args) {
            for(let key of state.listTask) {
                for(let item of key.tasks) {
                    if(args.taskId == item.id) {
                        item.functional = args.checked;
                    }
                }
            }
        },
        changeEditting(state, task) {
            for(let key of state.listTask) {
                for(let item of key.tasks) {
                    if(item.task == task.task) {
                        state.beforeEditCache = task.task;
                        item.editting = true;
                    }
                }
            }
        },
        saveEdittedTask(state, id) {
            for(let key of state.listTask) {
                for(let item of key.tasks) {
                    if(item.id == id) {
                        item.editting = false;
                    }
                }
            }
        },
        cancelEditting(state, id) {
            for(let key of state.listTask) {
                for(let item of key.tasks) {
                    if(item.id == id) {
                        item.task = state.beforeEditCache;
                        item.editting = false;
                    }
                }
            }
        },
        setTaskCompleted(state, id) {
            for(let key of state.listTask) {
                for(let item of key.tasks) {
                    if(id == item.id) {
                        item.completed = true;
                    }
                }
            }
        },
        deleteTask(state, id) {
            for(let key of state.listTask) {
                key.tasks.splice(id, 1);
            }
        },
        addNewTask(state, args) {
            for(let key of state.listTask) {
                if(key.id == args.id) {
                    key.tasks.push(args.task);
                }
            }
        },
        deleteTodo(state, id) {
            state.listTask.splice(id, 1);
        },
        setAdding(state, id) {
            for(let key of state.listTask) {
                if(key.id == id) {
                    key.adding = true;
                }
            }
        },
        cancelAdding(state, id) {
            for(let key of state.listTask) {
                if(key.id == id) {
                    key.adding = false;
                }
            }
        },
        cancelTaskComplete(state, id) {
            for(let key of state.listTask) {
                for(let item of key.tasks) {
                    if(id == item.id) {
                        item.completed = false;
                    }
                }
            }
        }
    },
    state: {
        countTask: 2,
        listTask: [],
        beforeEditCache: ''
    },
    getters: {
        counter(state) {
            return state.countTask;
        },
        listOfTasks(state) {
            return state.listTask;
        }
    }
};