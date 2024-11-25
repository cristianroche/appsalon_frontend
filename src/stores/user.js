import { computed, onMounted, ref } from "vue";
import { defineStore } from "pinia";
import AuthApi from "@/api/AuthApi";
import appointmentsApi from "@/api/AppointmentApi";
import { useRouter } from "vue-router";

export const useUserStore = defineStore("user", () => {
  const router = useRouter();
  const user = ref({});
  const userAppointments = ref([]);
  const loading = ref(true);

  onMounted(async () => {
    try {
      const { data } = await AuthApi.auth();
      user.value = data.user;
      await getUserAppointments();
    } catch (error) {
      console.error(error);
    } finally {
      loading.value = false;
    }
  });

  const getUserAppointments = async () => {
    const { data } = await appointmentsApi.getUserAppointments(user.value._id);
    userAppointments.value = data;
  };

  const logout = async () => {
    localStorage.removeItem("AUTH_TOKEN");
    router.push({ name: "login" });
  };

  const getUserName = computed(() =>
    user.value?.name ? user.value?.name : ""
  );

  const noAppointments = computed(() => userAppointments.value.length === 0);

  return {
    user,
    userAppointments,
    noAppointments,
    getUserName,
    getUserAppointments,
    logout,
    loading,
  };
});
