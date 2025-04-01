<script setup lang="ts">
import {type Task, Urgency} from "~/types";
import {useTaskStore} from "~/store/tasks";


  const task = ref<Task>({});
  const taskStore = useTaskStore();
  const {$pb} = useNuxtApp();
  const router = useRouter();

  async function addTask(){
    const user = getUser();
    if(!user){
      return;
    }

    task.value.createdAt = new Date();
    task.value.updatedAt = new Date();
    task.value.createdBy = user.id;
    task.value.isDone = false;



    const result = taskStore.createTask(task.value);

    if(result){
      console.log(result)
      router.push("/tasks")
    }
  }

</script>

<template>
  <main class="container mx-auto p-4 space-y-4 w-full flex justify-center items-center" v-if="task">
  <div class="flex flex-col space-y-4 w-1/2">
    <Input v-model="task.title" label="Title"  placeholder="Enter task title"/>

    <Textarea v-model="task.content" label="Content" placeholder="Enter task content" />

    <Select v-model="task.urgency">
      <SelectTrigger class="w-[180px]">
        <Badge size="sm">
          <SelectValue placeholder="Select an urgency" />
        </Badge>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Urgency</SelectLabel>
          <SelectItem v-for="urgency of Urgency" :value="urgency" :key="urgency">
            <Badge size="sm">
              {{ urgency }}
            </Badge>
          </SelectItem>

        </SelectGroup>
      </SelectContent>
    </Select>


    <Button @click="addTask">
      Confirm
    </Button>

  </div>



  </main>
</template>

