import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../views/HomeView.vue";
import AppointmentsLayout from "@/views/appointments/AppointmentsLayout.vue";

import AuthApi from "@/api/AuthApi";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/admin",
      name: "admin",
      component: () => import("@/views/admin/AdminLayout.vue"),
      meta: {
        requiresAdmin: true,
      },
      children: [
        {
          path: "",
          name: "admin-appointments",
          component: () => import("@/views/admin/AppointmentsView.vue"),
        },
      ],
    },
    {
      path: "/appointments",
      name: "appointments",
      component: AppointmentsLayout,
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: "",
          name: "my-appointments",
          component: () =>
            import("@/views/appointments/MyAppointmentsView.vue"),
        },
        {
          path: "new",
          component: () =>
            import("@/views/appointments/NewAppointmentLayout.vue"),
          children: [
            {
              path: "",
              name: "new-appointment",
              component: () => import("@/views/appointments/ServicesView.vue"),
            },
            {
              path: "details",
              name: "appointment-details",
              component: () =>
                import("@/views/appointments/AppointmentView.vue"),
            },
          ],
        },
        {
          path: ":id/edit",
          name: "edit-appointment",
          component: () =>
            import("@/views/appointments/EditAppointmentLayout.vue"),
          children: [
            {
              path: "",
              name: "edit-appointment",
              component: () => import("@/views/appointments/ServicesView.vue"),
            },
            {
              path: "details",
              name: "edit-appointment-details",
              component: () =>
                import("@/views/appointments/AppointmentView.vue"),
            },
          ],
        },
      ],
    },
    {
      path: "/auth",
      name: "auth",
      component: () => import("@/views/auth/AuthLayout.vue"),
      children: [
        {
          path: "register",
          name: "register",
          component: () => import("@/views/auth/RegisterView.vue"),
        },
        {
          path: "confirm-account/:token",
          name: "confirm-account",
          component: () => import("@/views/auth/ConfirmAccountView.vue"),
        },
        {
          path: "login",
          name: "login",
          component: () => import("@/views/auth/LoginView.vue"),
        },
        {
          path: "forgot-password",
          name: "forgot-password",
          component: () => import("@/views/auth/ForgotPasswordView.vue"),
        },
        {
          path: "forgot-password/:token",
          name: "reset-password",
          component: () => import("@/views/auth/ResetPasswordView.vue"),
        },
      ],
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (requiresAuth) {
    try {
      const {
        data: { user },
      } = await AuthApi.auth();
      if (user.admin) {
        next({ name: "admin" });
      } else {
        next();
      }
    } catch (error) {
      next({ name: "login" });
    }
  } else {
    next();
  }
});

router.beforeEach(async (to, from, next) => {
  const requiresAdmin = to.matched.some((record) => record.meta.requiresAdmin);

  if (requiresAdmin) {
    try {
      await AuthApi.admin();
      next();
    } catch (error) {
      next({ name: "login" });
    }
  } else {
    next();
  }
});

export default router;
