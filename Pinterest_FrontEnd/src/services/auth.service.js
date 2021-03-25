import { requestUrl } from "../config/requestUrl";
import { requestService } from "./request.service";

const login = (payload) => requestService.post(requestUrl.auth, payload);

const register = (payload) => requestService.post(requestUrl.register, payload);

export const authService = {
  login,
  register,
};
