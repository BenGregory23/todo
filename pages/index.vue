<script setup lang="ts">
import PocketBase from 'pocketbase';

const pb = new PocketBase('https://wind.oxyjen.io');


onMounted(async () =>{
  const records = await pb.collection('tasks').getFullList({
    sort: '-someField',
  });

  console.log(records);
})


</script>

<template>
  <Button>Test</Button>
</template>

