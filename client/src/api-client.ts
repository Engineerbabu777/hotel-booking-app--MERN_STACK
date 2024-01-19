
import { RegisterFormData } from "./pages/Register";
// import { SignInFormData } from "./pages/SignIn";
// import {
//   HotelSearchResponse,
//   HotelType,
//   PaymentIntentResponse,
//   UserType,
// } from "../../backend/src/shared/types";
// import { BookingFormData } from "./forms/BookingForm/BookingForm";

const API_BASE_URL = "http://localhost:4444";

export const register = async (formData: RegisterFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/users/register`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
  
    const responseBody = await response.json();
  
    if (!response.ok) {
      throw new Error(responseBody.message);
    }
  };