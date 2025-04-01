<script setup lang="ts">

import type {Task} from "~/types";
import getUrgencyColor from "~/utils/getUrgencyColor";
import {useTaskStore} from "~/store/tasks";

const {$pb} = useNuxtApp();
const taskStore = useTaskStore()
const {task} = defineProps({
    task: {
        type: Object as () => Task,
        required: true
    }
})


async function deleteTask(task:Task){
  try{

     await taskStore.deleteTask(task)
  }catch (e){
    console.error(e)
  }
}


async function toggleTask(task:Task){
  try{
    const updatedTask = {...task,isDone:!task.isDone};
    const record = await $pb.collection('tasks').update(updatedTask.id,updatedTask);
    if(record){
      task.isDone = updatedTask.isDone;
    }
  }catch (error) {
    console.error(error);
  }
}

</script>

<template>
  <li  :key="task.id" class="relative flex items-start space-x-2 group ">
    <Button size="xs" variant="destructive" :class="`absolute -left-14 hidden ${ task.isDone ? 'group-hover:block' : ''}`" @click="()=>deleteTask(task)">
      Delete
    </Button>
    <Checkbox :id="task.id" class="size-6" @click="()=>toggleTask(task)" :checked="task.isDone"  :default-value="task.isDone" />
    <div class="flex flex-col">
      <div class="flex items-center space-x-2">

        <Badge size="sm" :class="`${getUrgencyColor(task.urgency)}`">
          {{ task.urgency }}
        </Badge>
        <label
            :for="task.id"
            class=" font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 hover:cursor-pointer"
        >
          {{ task.title }}
        </label>
      </div>
      <p class="text-muted-foreground text-xs">
        {{ task.content }}
      </p>
    </div>




  </li>
</template>

<style scoped>

</style>