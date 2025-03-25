import PocketBase from "pocketbase";

export default defineNuxtRouteMiddleware((to, from) => {
   const { $pb } = useNuxtApp();

   if(!$pb.authStore.token && to.path !== '/auth/login') {
       console.log('User is not authenticated')
       return navigateTo('/auth/login')
   }
})