<script setup lang="ts">
import type {Task} from "~/types";
import getUrgencyColor from "~/utils/getUrgencyColor";
import Empty from "~/components/Empty.vue";

const {$pb}  = useNuxtApp()
const records = ref<Task[]>(await $pb.collection('tasks').getFullList());
const hasUncompletedTasks = computed(()=>records.value.some((record:Task)=>record.isDone == false));
const showTasksDone = ref(false)

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


async function deleteTask(task:Task){
  try{
    console.log(task)
    const deleted = await $pb.collection("tasks").delete(task.id);
    if(deleted){
      records.value = records.value.filter((record:Task)=>record.id !== task.id);
    }
  }catch (e){
    console.error(e)
  }
}

function toggleTaskVisibility(){
  showTasksDone.value = !showTasksDone.value
}
</script>

<template>
  <main class="flex flex-col space-y-4 p-10 items-center w-full">
    <div class="w-1/2">


    <div class="flex justify-between items-center mb-4 ">
        <span>
          <NuxtLink as-child to="/tasks/add">
            <Button variant="default" class="text-xs" size="xs">
              Add Task
            </Button>
          </NuxtLink>
          </span>
          <span class="text-muted-foreground text-xs hover:cursor-pointer hover:underline" @click="toggleTaskVisibility">
            {{ records.filter((record)=>record.isDone == true)?.length }} tasks completed
          </span>



    </div>
    <ul class=" space-y-4" >
      <li v-for="record in records.filter((task:Task)=> showTasksDone ? task.isDone == true || task.isDone == false : task.isDone == false)" :key="record.id" class="relative flex items-start space-x-2 group ">
        <Button size="xs" variant="destructive" :class="`absolute -left-14 hidden ${ record.isDone ? 'group-hover:block' : ''}`" @click="()=>deleteTask(record)">
          Delete
        </Button>
        <Checkbox :id="record.id" class="size-6" @click="()=>toggleTask(record)" :checked="record.isDone" :value="record.isDone" :default-value="record.isDone" />
        <div class="flex flex-col">
          <div class="flex items-center space-x-2">
            <Badge size="sm" :class="`${getUrgencyColor(record.urgency)}`">
            {{ record.urgency }}
          </Badge>
            <label
                :for="record.id"
                class=" font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 hover:cursor-pointer"
            >
              {{ record.title }}
            </label>
          </div>
          <p class="text-muted-foreground text-xs">
            {{ record.content }}
          </p>
        </div>


      </li>
    </ul>
    <Empty  v-if="!hasUncompletedTasks && !showTasksDone" />
    </div>

  </main>
</template>
