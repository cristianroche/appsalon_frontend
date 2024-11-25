<script setup>
import AdminAppointment from "@/components/AdminAppointment.vue";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
</script>

<template>
  <p class="text-white text-lg mt-5">
    Below you can manage your upcoming appointments
  </p>

  <p v-if="userStore.loading" class="text-white text-2xl text-center mt-5">
    Loading...
  </p>

  <div v-else>
    <p
      v-if="userStore.noAppointments"
      class="text-white text-2xl text-center mt-5"
    >
      You have no upcoming appointments
    </p>

    <div v-else class="grid grid-cols-1 gap-5 mt-10">
      <AdminAppointment
        v-for="appointment in userStore.userAppointments"
        :key="appointment._id"
        :appointment="appointment"
      />
    </div>
  </div>
</template>
