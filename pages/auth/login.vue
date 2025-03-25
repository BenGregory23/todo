<script setup lang="ts">
const {$pb} = useNuxtApp();
const router = useRouter();
definePageMeta({
  layout: 'guest'
})


onMounted(async()=>{
  await $pb.collection('users').authWithOAuth2({ provider: 'Discord' });

})

async function clicked() {
  const req = await $pb.collection('users').authWithOAuth2({
    provider: 'discord',
  });


  const data = {
    username: req.meta.username,
    avatarUrl: req.meta.avatarUrl
  };

  if ($pb.authStore.isValid) {
    await $pb.collection('users').update(req.record.id, data);
    console.log($pb.authStore)
    router.push('/');

  } else {
    // Todo notify error
  }
}

</script>

<template>

  <main class="flex flex-col items-center justify-center h-screen w-full relative">

    <NuxtImg src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpreview.redd.it%2Fbzrermc11fy61.png%3Fwidth%3D5000%26format%3Dpng%26auto%3Dwebp%26s%3Ddd0ad8e9e65e5b02df5ffa143ccfe925125855e8&f=1&nofb=1&ipt=d51c15786f94417699e04f9ffe343ddb29f44ce502d86ac9fb62c4beea013f86&ipo=images"

             class="absolute z-0 object-cover h-full w-full" />

      <div class="z-10 flex flex-col items-center space-y-4">

        <div class="z-10 bg-slate-50 p-10  rounded-lg shadow-lg flex flex-col items-center space-y-4">



          <NuxtImg src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F018%2F930%2F718%2Foriginal%2Fdiscord-logo-discord-icon-transparent-free-png.png&f=1&nofb=1&ipt=d49a108854d628cc7b47d367b2008e506157f5bcccf2ec28519414780b2a7536&ipo=images"
                   class="size-44 rounded-full" alt="Discord Logo"
          />

          <Button @click="clicked">
            Login with Discord
          </Button>
        </div>

      </div>




  </main>




</template>
