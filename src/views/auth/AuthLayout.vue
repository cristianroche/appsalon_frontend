<script setup>
const routes = [
  { name: "register", text: "Create an account" },
  { name: "login", text: "Login" },
  { name: "forgot-password", text: "Forgot my password" },
];
</script>

<template>
  <div class="mx-auto lg:w-3/5 mt-20">
    <RouterView />

    <nav
      class="mt-10 flex flex-col items-center space-y-5 lg:flex-row lg:justify-between lg:space-y-0"
    >
      <RouterLink
        v-for="route in routes"
        :key="route.name"
        :to="{ name: route.name }"
        class="uppercase font-bold text-white"
        v-show="route.name !== $route.name"
      >
        {{ route.text }}
      </RouterLink>
    </nav>
  </div>
</template>
