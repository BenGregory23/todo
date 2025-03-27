<script setup lang="ts">
import {Home, List, Film, Tv, Shrimp, AlarmClock, Gamepad} from "lucide-vue-next";
import PocketBase from "pocketbase";

const {$pb} = useNuxtApp();
const router = useRouter();
const activeRoute = ref("Home");
const routes = [
  {
    name: 'Home',
    icon: Home,
    path: '/',
  },
  {
    name: 'Tasks',
    icon: List,
    path: '/tasks',
  },
  {
    name: 'Events',
    icon: AlarmClock,
    path: '/events',
  },
  {
    name: 'Movies',
    icon: Film,
    path: '/movies',
  },
  {
    name: 'TV Shows',
    icon: Tv,
    path: '/shows',
  },
  {
    name: 'Games',
    icon: Gamepad,
    path: '/games',
  },
  {
    name: 'Restaurants',
    icon: Shrimp,
    path: '/restaurants',
  },
]


const logout =  () => {
  try {
     $pb.authStore.clear();
     const authToken = useCookie("auth_token")
    authToken.value = null
     router.push('/auth/login');
  } catch (error) {
    console.error(error);
  }
};

</script>

<template>
<div class="h-svh w-20 border-r border-black  flex flex-col justify-between items-center">

  <div class="flex flex-col items-center space-y-5">
    <span class="py-4">
      <h2 class="text-center text-2xl font-bold">
        bin.
      </h2>
<!--      <NuxtImg src="https://cdn.discordapp.com/icons/696675534364606565/5fba0f63f22f6f1ade53ca32d934a06b.webp?size=240" alt="Logo" class="size-14 rounded-full" />-->
    </span>

    <div class="flex flex-col items-center space-y-4">

      <Tooltip v-for="route in routes" :key="route.name">
        <NuxtLink  :to="route.path"  variant="ghost">
        <TooltipTrigger  @click="()=>{
        activeRoute = route.name;
      }"  class="" :class="`border-2 hover:bg-gray-100 flex justify-center items-center rounded-lg p-3 ${activeRoute === route.name ? 'border-black' : 'border-transparent'}`">

            <component :is="route.icon" class="size-6"/>
        </TooltipTrigger>
        </NuxtLink>

        <TooltipContent>
          <p>{{route.name}}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  </div>



  <div v-if="$pb.authStore.isValid" class="flex flex-col items-center space-y-4 p-2">

    <DropdownMenu>
      <DropdownMenuTrigger>

        <Avatar>
          <AvatarImage :src="'https://wind.oxyjen.io/api/files/users/'+$pb.authStore.record?.id+'/'+$pb.authStore.record?.avatar" alt="@unovue" />
          <AvatarFallback>{{
              $pb.authStore.record?.name[0]
            }}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem @click="logout">
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>


  </div>
</div>
</template>
