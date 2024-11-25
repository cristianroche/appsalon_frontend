<script setup>
import AuthApi from "@/api/AuthApi";
import { inject, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { reset } from "@formkit/vue";
import { set } from "date-fns";

const toast = inject("toast");

const router = useRouter();
const route = useRoute();

const { token } = route.params;

const validToken = ref(false);

onMounted(async () => {
  try {
    await AuthApi.verifyPasswordResetToken(token);

    validToken.value = true;
  } catch (error) {
    toast.error(error.response.data.message);
    router.push({ name: "forgotPassword" });
  }
});

const handleSubmit = async ({ password }) => {
  try {
    const { data } = await AuthApi.updatePassword(token, { password });

    toast.success(data.message);

    reset("resetPasswordForm");

    setTimeout(() => {
      router.push({ name: "login" });
    }, 2000);
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
</script>

<template>
  <div v-if="validToken">
    <h1 class="text-6xl font-extrabold text-white text-center mt-10">
      Reset my password
    </h1>
    <p class="text-2xl text-white text-center my-5">
      Recover access to your account
    </p>

    <FormKit
      id="resetPasswordForm"
      type="form"
      :actions="false"
      incomplete-message="Could not be sent, please check your messages"
      @submit="handleSubmit"
    >
      <FormKit
        type="password"
        placeholder="Enter Your new password - min 8 characters"
        label="New Password"
        name="password"
        validation="required|min:6"
        :validation-messages="{
          required: 'Password is required',
          min: 'Password must be at least 8 characters',
        }"
      />
      <FormKit
        type="password"
        placeholder="Confirm Your new password"
        label="Confirm Password"
        name="confirmPassword"
        validation="required|same:password"
        :validation-messages="{
          required: 'Password confirmation is required',
          same: 'Passwords must match',
        }"
      />
      <FormKit type="submit">Reset</FormKit>
    </FormKit>
  </div>

  <p v-else class="text-2xl text-white text-center font-black">Invalid Token</p>
</template>
