<script setup>
import { inject } from "vue";
import { reset } from "@formkit/vue";

import AuthApi from "@/api/AuthApi";

const toast = inject("toast");

const handleSubmit = async ({ password_confirm, ...formData }) => {
  try {
    const { data } = await AuthApi.register(formData);
    toast.success(data.message);
    reset("registerForm");
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
    <h1 class="text-6xl font-extrabold text-white text-center mt-10">
      Create an account
    </h1>
    <p class="text-2xl text-white text-center my-5">
      Create an account in AppSalon
    </p>

    <FormKit
      id="registerForm"
      type="form"
      :actions="false"
      incomplete-message="Could not be sent, please check your messages"
      @submit="handleSubmit"
    >
      <FormKit
        type="text"
        placeholder="Your name"
        label="Name"
        name="name"
        validation="required|length:3"
        :validation-messages="{
          required: 'Name is required',
          length: 'Name must be at least 3 characters',
        }"
      />

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
        placeholder="Password - 8 characters minimum"
        label="Password"
        name="password"
        validation="required|length:8"
        :validation-messages="{
          required: 'Password is required',
          length: 'Password must be at least 8 characters',
        }"
      />

      <FormKit
        type="password"
        placeholder="Confirm your password"
        label="Repeat Password"
        name="password_confirm"
        validation="required|confirm"
        :validation-messages="{
          required: 'Password is required',
          confirm: 'Passwords do not match',
        }"
      />

      <FormKit type="submit">Create Account</FormKit>
    </FormKit>
  </div>
</template>
