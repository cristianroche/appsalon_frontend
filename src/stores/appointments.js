import { defineStore } from "pinia";
import { computed, inject, onMounted, ref, watch } from "vue";
import AppointmentApi from "@/api/AppointmentApi";
import { convertToISO, convertToMMDDYYYY } from "@/helpers/date";
import { useRouter } from "vue-router";
import { useUserStore } from "./user";

export const useAppointmentsStore = defineStore("appointments", () => {
  const appointmentId = ref("");
  const services = ref([]);
  const date = ref("");
  const hours = ref([]);
  const time = ref("");
  const appointmentsByDate = ref([]);

  const toast = inject("toast");

  const router = useRouter();
  const userStores = useUserStore();

  onMounted(() => {
    const startHour = 10;
    const endHour = 19;
    for (let hour = startHour; hour <= endHour; hour++) {
      hours.value.push(hour + ":00");
    }
  });

  watch(date, async () => {
    time.value = "";
    if (date.value === "") {
      return;
    }
    const { data } = await AppointmentApi.getByDate(date.value);

    if (appointmentId.value) {
      appointmentsByDate.value = data.filter(
        (appointment) => appointment._id !== appointmentId.value
      );
      time.value = data.filter(
        (appointment) => appointment._id === appointmentId.value
      )[0].time;
    } else {
      appointmentsByDate.value = data;
    }
  });

  const onServiceSelected = (service) => {
    if (
      services.value.some(
        (selectedService) => selectedService._id === service._id
      )
    ) {
      removeService(service._id);
    } else {
      if (services.value.length === 2) {
        alert("You can only select up to 2 services per appointment.");
        return;
      }
      services.value.push(service);
    }
  };

  const saveAppointment = async () => {
    const appointment = {
      services: services.value.map((service) => service._id),
      date: convertToISO(date.value),
      time: time.value,
      totalAmount: totalAmount.value,
    };

    let result = {};

    try {
      if (appointmentId.value) {
        result = await AppointmentApi.updateAppointment(
          appointmentId.value,
          appointment
        );
      } else {
        result = await AppointmentApi.create(appointment);
      }

      toast.success(result.data.message);
      clearAppointmentData();
      userStores.getUserAppointments();

      router.push({ name: "my-appointments" });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const cancelAppointment = async (id) => {
    if (!confirm("Are you sure you want to cancel this appointment?")) {
      return;
    }
    try {
      const { data } = await AppointmentApi.deleteAppointment(id);
      userStores.getUserAppointments();
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const clearAppointmentData = () => {
    services.value = [];
    date.value = "";
    time.value = "";
    appointmentId.value = "";
  };

  const removeService = (id) => {
    services.value = services.value.filter(
      (selectedService) => selectedService._id !== id
    );
  };

  const setSelectedAppointment = async (appointment) => {
    services.value = appointment.services;
    date.value = convertToMMDDYYYY(appointment.date);
    time.value = appointment.time;

    appointmentId.value = appointment._id;
  };

  const isServiceSelected = computed(() => (id) => {
    return services.value.some((service) => service._id === id);
  });

  const totalAmount = computed(() => {
    return services.value.reduce((acc, service) => acc + service.price, 0);
  });

  const noServicesSelected = computed(() => services.value.length === 0);

  const isValidReservation = computed(() => {
    return services.value.length > 0 && date.value && time.value;
  });

  const isDateSelected = computed(() => date.value !== "");

  const disableTime = computed(() => {
    return (hour) => {
      return appointmentsByDate.value.find(
        (appointment) => appointment.time === hour
      );
    };
  });

  const IsEditing = computed(() => appointmentId.value !== "");

  return {
    services,
    date,
    hours,
    time,
    onServiceSelected,
    removeService,
    saveAppointment,
    cancelAppointment,
    setSelectedAppointment,
    clearAppointmentData,
    disableTime,
    totalAmount,
    noServicesSelected,
    isServiceSelected,
    isValidReservation,
    isDateSelected,
    IsEditing,
  };
});
