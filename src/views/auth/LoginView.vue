<script setup>
import AuthApi from "@/api/AuthApi";
import { inject } from "vue";
import { useRouter } from "vue-router";

const toast = inject("toast");

const router = useRouter();

const handleSubmit = async (formData) => {
  try {
    const {
      data: { token },
    } = await AuthApi.login(formData);

    localStorage.setItem("AUTH_TOKEN", token);

    router.push({ name: "my-appointments" });
  } catch (error) {
    if (error.response) {
      toast.error(error.response.data.message);
    } else {
      toast.error("An error occurred");
    }
  }
};
</script>

<template>
  <div>
    <h1 class="text-6xl font-extrabold text-white text-center mt-10">Login</h1>
    <p class="text-2xl text-white text-center my-5">
      If you have an account, please log in
    </p>

    <FormKit
      id="registerForm"
      type="form"
      :actions="false"
      incomplete-message="Could not be sent, please check your messages"
      @submit="handleSubmit"
    >
      <FormKit
        type="email"
        placeholder="Your email"
        label="Email"
        name="email"
        validation="required|email"
        :validation-messages="{
          required: 'Email is required',
          email: 'Must be a valid email',
        }"
      />

      <FormKit
        type="password"
        placeholder="Your Password"
        label="Password"
        name="password"
        validation="required"
        :validation-messages="{
          required: 'Password is required',
        }"
      />

      <FormKit type="submit">Login</FormKit>
    </FormKit>
  </div>
</template>
