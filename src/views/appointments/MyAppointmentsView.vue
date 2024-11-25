<script setup>
import Appointment from "@/components/Appointment.vue";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
</script>

<template>
  <h2 class="text-4xl font-extrabold text-white mt-10">My Appointments</h2>
  <p class="text-white text-lg mt-5">
    Here you can manage your upcoming appointments
  </p>

  <p v-if="userStore.loading" class="text-white text-2xl text-center mt-5">
    Loading...
  </p>

  <div v-else>
    <p
      v-if="useUserStore.noAppointments"
      class="text-white text-2xl text-center mt-5"
    >
      You have no upcoming appointments
    </p>

    <div v-else class="grid grid-cols-1 gap-5 mt-10">
      <Appointment
        v-for="appointment in userStore.userAppointments"
        :key="appointment._id"
        :appointment="appointment"
      />
    </div>
  </div>
</template>
