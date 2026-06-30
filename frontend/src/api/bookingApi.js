import api from "./axios";

/* ===========================
   Create Booking
=========================== */

export const createBooking = async (
  bookingData
) => {
  const response = await api.post(
    "/bookings",
    bookingData
  );

  return response.data;
};

/* ===========================
   Get Booking By Reference
=========================== */

export const getBooking = async (
  bookingReference
) => {
  const response = await api.get(
    `/bookings/${bookingReference}`
  );

  return response.data;
};

/* ===========================
   Get My Bookings
=========================== */

export const getMyBookings =
  async () => {
    const response = await api.get(
      "/bookings/my-bookings"
    );

    return response.data;
  };

/* ===========================
   Alias
=========================== */

export const getBookingById =
  getBooking;

/* ===========================
   Cancel Booking
=========================== */

export const cancelBooking =
  async (bookingReference) => {
    const response =
      await api.delete(
        `/bookings/${bookingReference}`
      );

    return response.data;
  };

/* ===========================
   Admin - Get All Bookings
=========================== */

export const getAllBookings =
  async () => {
    const response = await api.get(
      "/bookings"
    );

    return response.data;
  };

/* ===========================
   Admin - Get By Status
=========================== */

export const getBookingsByStatus =
  async (status) => {
    const response = await api.get(
      `/bookings/status/${status}`
    );

    return response.data;
  };

/* ===========================
   Admin - Update Status
=========================== */

export const updateBookingStatus =
  async (id, status) => {
    const statusValue =
      status === "Confirmed"
        ? 1
        : 2;

    const response = await api.put(
      `/bookings/${id}/status`,
      statusValue,
      {
        headers: {
          "Content-Type":
            "application/json",
        },
      }
    );

    return response.data;
  };