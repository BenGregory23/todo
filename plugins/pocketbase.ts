import PocketBase from 'pocketbase';

export default defineNuxtPlugin(() => {
    const pb = new PocketBase('https://wind.oxyjen.io');
    return {
        provide:{
            pb: pb
        }
    }
})