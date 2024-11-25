import api from "@/lib/axios";

export default {
  create: (data) => api.post("/appointments", data),
  getByDate: (date) => api.get(`/appointments?date=${date}`),
  getUserAppointments: (userId) => api.get(`/users/${userId}/appointments`),
  getById: (id) => api.get(`/appointments/${id}`),
  updateAppointment: (id, data) => api.put(`/appointments/${id}`, data),
  deleteAppointment: (id) => api.delete(`/appointments/${id}`),
};
