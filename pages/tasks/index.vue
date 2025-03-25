<script setup lang="ts">
import PocketBase from 'pocketbase';

const pb = new PocketBase('https://wind.oxyjen.io');
const records = ref(await pb.collection('tasks').getFullList());


async function toggleTask(task:any){
  try{
    const updatedTask = {...task,isDone:!task.isDone};
    const record = await pb.collection('tasks').update(updatedTask.id,updatedTask);
    if(record){
      task.isDone = updatedTask.isDone;
    }
  }catch (error) {
    console.error(error);
  }
}
</script>

<template>
  <main class="flex flex-col space-y-4 p-10 items-center w-full">
    <div class="flex justify-between items-center mb-4 w-1/2">
        <span>
          <NuxtLink as-child to="/tasks/add">
            <Button variant="default" class="text-xs" size="xs">
              Add Task
            </Button>
          </NuxtLink>
          </span>
      <span class="text-muted-foreground text-xs">
          {{ records.filter((record)=>record.isDone == true)?.length }} tasks completed
      </span>


    </div>
    <ul class=" space-y-4 w-1/2  ">
      <li v-for="record in records" :key="record.id" class="flex items-start space-x-2 ">
        <Checkbox :id="record.id" class="size-6" @click="()=>toggleTask(record)" :checked="record.isDone" :value="record.isDone" :default-value="record.isDone" />
        <div class="flex flex-col">
          <div class="flex items-center space-x-2">
            <Badge size="sm">
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

  </main>
</template>
