<script setup>
import { inject, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

import AuthApi from "@/api/AuthApi";

const route = useRoute();
const router = useRouter();

const toast = inject("toast");

const { token } = route.params;

onMounted(async () => {
  try {
    const { data } = await AuthApi.verifyAccount(token);
    toast.success(data.message);
    router.push({ name: "login" });
  } catch (error) {
    if (error.response) {
      toast.error(error.response.data.message);
    } else {
      toast.error("An error occurred");
    }
  }
});
</script>

<template>
  <div>
    <h1>Confirm Account View</h1>
  </div>
</template>
