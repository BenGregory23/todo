import { defineStore } from 'pinia';
import type {Task} from "~/types";
import PocketBase from "pocketbase";

const $pb = new PocketBase("https://wind.oxyjen.io")


export const useTaskStore = defineStore('taskStore', {
    state: ():{tasks:Task[]} => ({
        tasks: [],
    }),
    actions: {
        async fetchTasks() {
          this.tasks = await $pb.collection('tasks').getFullList();
        },
        async createTask(task:Task) {

            const result = await $pb.collection('tasks').create(task);

            if(result){
                this.tasks.push(task);
                return result;
            }
            else return null;
        },
        async deleteTask(task:Task) {
            const result = await $pb.collection('tasks').delete(task.id);

            if(result){
                this.tasks = this.tasks.filter((t:Task) => t.id !== task.id);
                return result;
            }
            else return null;
        },
        async update(task:Task){
            console.log(task)
            const result = await $pb.collection("tasks").update(task.id,task)
            if(result){
                console.log("update result", result)
                const localTask = this.tasks.find((t:Task)=>t.id == task.id)
                if(localTask){
                    //localTask = result
                }
            }
        }

    }
});