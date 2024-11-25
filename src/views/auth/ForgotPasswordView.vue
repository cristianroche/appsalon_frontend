<script setup>
import AuthApi from "@/api/AuthApi";
import { inject } from "vue";
import { useRouter } from "vue-router";
import { reset } from "@formkit/vue";

const toast = inject("toast");

const router = useRouter();

const handleSubmit = async ({ email }) => {
  try {
    const { data } = await AuthApi.forgotPassword({ email });
    toast.success(data.message);
    reset("forgotPasswordForm");
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
</script>

<template>
  <div>
    <h1 class="text-6xl font-extrabold text-white text-center mt-10">
      Forgot my password
    </h1>
    <p class="text-2xl text-white text-center my-5">
      Recover access to your account
    </p>

    <FormKit
      id="forgotPasswordForm"
      type="form"
      :actions="false"
      incomplete-message="Could not be sent, please check your messages"
      @submit="handleSubmit"
    >
      <FormKit
        type="email"
        placeholder="Enter Your email"
        label="Email"
        name="email"
        validation="required|email"
        :validation-messages="{
          required: 'Email is required',
          email: 'Must be a valid email',
        }"
      />
      <FormKit type="submit">Send</FormKit>
    </FormKit>
  </div>
</template>
