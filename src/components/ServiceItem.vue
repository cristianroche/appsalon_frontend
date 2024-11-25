<script setup>
import { formatCurrency } from "@/helpers";
import { useAppointmentsStore } from "@/stores/appointments";

defineProps({
  service: {
    type: Object,
    required: true,
  },
});

const appointmentsStore = useAppointmentsStore();
</script>

<template>
  <div
    class="rounded-lg p-5 space-y-5 cursor-pointer"
    :class="
      appointmentsStore.isServiceSelected(service._id)
        ? 'bg-blue-500 text-white'
        : 'bg-white'
    "
    @click="appointmentsStore.onServiceSelected(service)"
  >
    <h3 class="text-2xl font-light">{{ service.name }}</h3>
    <p
      class="text-4xl font-black"
      :class="
        appointmentsStore.isServiceSelected(service._id)
          ? 'text-white'
          : 'text-blue-600'
      "
    >
      {{ formatCurrency(service.price) }}
    </p>
  </div>
</template>
