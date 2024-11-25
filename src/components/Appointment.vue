<script setup>
import { formatCurrency } from "@/helpers";
import { convertToDisplayDate } from "@/helpers/date";
import { useAppointmentsStore } from "@/stores/appointments";

defineProps({
  appointment: {
    type: Object,
    required: true,
  },
});

const appointmentsStore = useAppointmentsStore();
</script>

<template>
  <div class="bg-white p-5 space-y-3 rounded-lg">
    <p class="text-gray-500 font-black">
      Date:
      <span class="font-light">{{
        convertToDisplayDate(appointment.date)
      }}</span>
      Time:
      <span class="font-light">{{ appointment.time }} hours</span>
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
        {{ formatCurrency(appointment.totalAmount) }}</span
      >
    </p>

    <div class="flex gap-2 items-center">
      <RouterLink
        class="bg-slate-600 rounded-lg p-3 text-white text-sm uppercase font-black flex-1 md:flex-none"
        :to="{ name: 'edit-appointment', params: { id: appointment._id } }"
      >
        Edit
      </RouterLink>

      <button
        class="bg-red-600 rounded-lg p-3 text-white text-sm uppercase font-black flex-1 md:flex-none"
        @click="appointmentsStore.cancelAppointment(appointment._id)"
      >
        Cancel
      </button>
    </div>
  </div>
</template>
