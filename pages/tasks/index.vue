<script setup lang="ts">
import type {Task} from "~/types";
import {useTaskStore} from "~/store/tasks";

const taskStore = useTaskStore();
taskStore.fetchTasks();

const visibleTasks = computed(()=>taskStore.tasks.filter((t:Task)=> showTasksDone ? t.isDone || !t.isDone : !t.isDone ));
const hasUncompletedTasks = computed(()=>taskStore.tasks.some((task:Task)=>!task.isDone));
const showTasksDone = ref(false);





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
            {{ taskStore.tasks.filter((t:Task)=>t.isDone == true)?.length }} tasks completed
          </span>



    </div>
    <ul class=" space-y-4" v-if="visibleTasks.length > 0" >
      <TaskLine v-for="task in visibleTasks" :key="task.id" :task="task" />
    </ul>
    <Empty  v-else />
    </div>

  </main>
</template>
