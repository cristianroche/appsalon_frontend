<script setup>
import { formatCurrency } from "@/helpers";
import { convertToDisplayDate } from "@/helpers/date";

defineProps({
  appointment: {
    type: Object,
  },
});
</script>

<template>
  <div class="bg-white p-5 space-y-3 rounded-lg">
    <p class="text-gray-500 font-black">
      Fecha:
      <span class="font-light mr-1">
        {{ convertToDisplayDate(appointment.date) }}
      </span>
      Hora: <span class="font-light"> {{ appointment.time }} Hours.</span>
    </p>

    <p class="text-gray-500 font-black">
      Name:
      <span class="font-light mr-1">{{ appointment.user.name }} </span> Email:
      <span class="font-light">{{ appointment.user.email }} </span>
    </p>

    <p class="text-lg font-black">Services requested at the appointment</p>
    <div v-for="service in appointment.services">
      <p>{{ service.name }}</p>
      <p class="text-2xl font-black text-blue-500">
        {{ formatCurrency(service.price) }}
      </p>
    </div>

    <p class="text-2xl font-black text-right">
      Total:
      <span class="text-blue-600">
        {{ formatCurrency(appointment.totalAmount) }}
      </span>
    </p>
  </div>
</template>
