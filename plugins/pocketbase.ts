// plugins/pocketbase.ts
import PocketBase from 'pocketbase';

export default defineNuxtPlugin(nuxtApp => {
    // Doing something with nuxtApp
    const pb = new PocketBase('https://wind.oxyjen.io');
    return {
        provide:{
            pb: pb
        }
    }
})