

export default function getUser(){
    const {$pb} =  useNuxtApp();
    return $pb.authStore.record;
}