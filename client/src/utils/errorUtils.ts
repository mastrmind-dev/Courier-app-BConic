import { IError } from "@/data_structures/interfaces";

export const showResponseError = (error: IError) => {
  if (error.response) {
    if (error.response.data.error) {
      return error.response.data.error;
    }
  }
  return null;
};
