import PocketBase from "pocketbase";

export default defineNuxtRouteMiddleware((to, from) => {
    const authToken = useCookie("auth_token")

   if(!authToken.value && to.path !== '/auth/login') {
       return navigateTo('/auth/login')
   }
})