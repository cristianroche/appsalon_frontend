<script setup>
import VueTailwindDatePicker from "vue-tailwind-datepicker";
import SelectedService from "@/components/SelectedService.vue";
import { formatCurrency } from "@/helpers";
import { useAppointmentsStore } from "@/stores/appointments";
import { ref } from "vue";

const appointmentsStore = useAppointmentsStore();

const formatter = ref({
  date: "MM/DD/YYYY",
  month: "MMM",
});

const dDate = (date) => {
  const today = new Date();
  return date < today;
};
</script>

<template>
  <h2 class="text-4xl font-extrabold text-white">
    Appointment Detail & Summary
  </h2>
  <p class="text-white text-lg">
    Next, verify the information and confirm your appointment.
  </p>

  <h3 class="text-3xl font-extrabold text-white">Services</h3>

  <p
    v-if="appointmentsStore.noServicesSelected"
    class="text-center text-white text-2xl"
  >
    No Services Selected
  </p>

  <div v-else class="grid gap-5">
    <SelectedService
      v-for="service in appointmentsStore.services"
      :key="service.id"
      :service="service"
    />

    <p class="text-right text-white text-2xl">
      Total:
      <span class="font-black">{{
        formatCurrency(appointmentsStore.totalAmount)
      }}</span>
    </p>
  </div>

  <div class="space-y-8" v-if="!appointmentsStore.noServicesSelected">
    <h3 class="text-3xl font-extrabold text-white">Date and Time</h3>

    <div class="lg:flex gap-5 items-start">
      <div class="w-full lg:w-96 bg-white flex justify-center rounded-lg">
        <VueTailwindDatePicker
          i18n="en-US"
          as-single
          no-input
          :formatter="formatter"
          :disable-date="dDate"
          v-model="appointmentsStore.date"
        />
      </div>
      <div
        v-if="appointmentsStore.isDateSelected"
        class="flex-1 grid grid-cols-1 xl:grid-cols-2 gap-5 mt-10 lg:mt-0"
      >
        <button
          v-for="hour in appointmentsStore.hours"
          class="block text-blue-500 rounded-lg text-xl font-black p-3 disabled:opacity-10"
          :class="
            appointmentsStore.time === hour
              ? 'bg-blue-500 text-white'
              : 'bg-white'
          "
          @click="appointmentsStore.time = hour"
          :disabled="appointmentsStore.disableTime(hour) ? true : false"
        >
          {{ hour }}
        </button>
      </div>
    </div>
    <div v-if="appointmentsStore.isValidReservation" class="flex justify-end">
      <button
        @click="appointmentsStore.saveAppointment()"
        class="w-full md:w-auto bg-blue-500 p-3 rounded-lg uppercase font-black text-white"
      >
        Confirm Reservation
      </button>
    </div>
  </div>
</template>
