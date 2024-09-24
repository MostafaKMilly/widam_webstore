"use server";

import { cookies } from "next/headers";
import { User } from "../types/user.type";

interface SendOtpResponse {
  status_code: number;
  error: number;
  message: string;
  data: {
    otp_id: string;
  };
}

interface VerifyOtpResponse {
  status_code: number;
  error: number;
  message: string;
  data: {
    user_id: string;
    token: string;
  };
}

interface RegisterResponse {
  status_code: number;
  error: number;
  message: string;
  data: User;
  _server_messages: string;
}

interface SendOtpRequest {
  mobile_no: string;
}

interface VerifyOtpRequest {
  mobile_no: string;
  otp: string;
}

interface RegisterRequest {
  salutation: string;
  first_name: string;
  last_name: string;
  email: string;
  mobile_no: string;
  nationality: string;
}

async function sendOtp(
  requestData: SendOtpRequest
): Promise<SendOtpResponse | undefined> {
  const url = `${process.env.API_BASE_URL}/api/method/widam_delivery.login.send_otp`;

  const formData = new URLSearchParams();
  formData.append("mobile_no", requestData.mobile_no);

  const requestOptions: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData.toString(),
    redirect: "follow",
  };

  try {
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result: SendOtpResponse = await response.json();
    return result;
  } catch (error) {
    console.error("Error sending OTP:", error);
  }
}

async function verifyOtp(
  requestData: VerifyOtpRequest
): Promise<VerifyOtpResponse | undefined> {
  const url = `${process.env.API_BASE_URL}/api/method/widam_delivery.login.verify_otp`;

  const formData = new URLSearchParams();
  formData.append("mobile_no", requestData.mobile_no);
  formData.append("otp", requestData.otp);

  const requestOptions: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData.toString(),
    redirect: "follow",
  };

  try {
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result: VerifyOtpResponse = await response.json();
    return result;
  } catch (error) {
    console.error("Error verifying OTP:", error);
  }
}

async function register(
  requestData: RegisterRequest
): Promise<RegisterResponse | undefined> {
  const url = `${process.env.API_BASE_URL}/api/method/widam_delivery.register.register`;

  const formData = new URLSearchParams();
  formData.append("salutation", requestData.salutation);
  formData.append("first_name", requestData.first_name);
  formData.append("last_name", requestData.last_name);
  formData.append("email", requestData.email);
  formData.append("mobile_no", requestData.mobile_no);
  formData.append("nationality", requestData.nationality);
  const cookiesStore = cookies();

  const requestOptions: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Accept-Language": "en",
    },
    body: formData.toString(),
    redirect: "follow",
    credentials: "omit",
  };

  try {
    const response = await fetch(url, requestOptions);
    const result: RegisterResponse = await response.json();
    cookiesStore.set("token", result.data.token);
    return result;
  } catch (error) {
    console.error("Error registering user:", error);
  }
}

export { sendOtp, verifyOtp, register };

export type {
  SendOtpResponse,
  VerifyOtpResponse,
  RegisterResponse,
  SendOtpRequest,
  VerifyOtpRequest,
  RegisterRequest,
};
