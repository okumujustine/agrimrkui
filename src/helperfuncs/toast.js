import { toast } from "react-toastify";

export function toastSuccess(data, params) {
  if (params) {
    return toast.success(data, params);
  }
  return toast.success(data);
}
