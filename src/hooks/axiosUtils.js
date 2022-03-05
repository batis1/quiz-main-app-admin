import axios from "axios";
import { useContext, useEffect } from "react";
import { SetPopupContext } from "../App";
import apiList from "../lib/apiList";

export const checkForEmptyInput = (inputOject, params) => {
  let invalid = false;

  const invalidParams = [];
  for (let index = 0; index < params.length; index++) {
    const param = params[index];

    if (inputOject[params] === undefined || inputOject[params].length === 0) {
      invalid = true;
      invalidParams.push(params);
    }
  }

  return [invalid, invalidParams];
};

export const commonFunction = async (
  method,
  route,
  setFunction,
  setFunctionCallBack,
  inputData,
  setIsLoading
) => {
  try {
    setIsLoading && setIsLoading(true);
    const { data } = await axios[method](`${apiList.server}${route}`, {
      ...inputData,
    });
    setFunction && setFunction(setFunctionCallBack(data));
    setIsLoading && setIsLoading(false);
    return { data };
  } catch (error) {
    return { error };
  }
};
export const callAxios = async (
  method,
  route,
  setFunction,
  setFunctionCallBack,
  inputData,
  setIsLoading
) => {
  const { error } = await commonFunction(
    method,
    route,
    setFunction,
    setFunctionCallBack,
    inputData,
    setIsLoading
  );

  console.log(error);
  return { error };
};

export const handleAxiosError = (error, setPopup) => {
  let messageLocal = "";

  if (error.response.data?.message) {
    messageLocal = error.response.data?.message;
  } else {
    messageLocal = "something went wrong from the server";
  }

  setPopup({
    open: true,
    severity: "error",
    message: messageLocal,
  });
};

export const useAxios = async (
  method,
  route,
  setFunction,
  setFunctionCallBack,
  inputData,
  setIsLoading
) => {
  const setPopup = useContext(SetPopupContext);

  useEffect(() => {
    (async () => {
      const { error } = await commonFunction(
        method,
        route,
        setFunction,
        setFunctionCallBack,
        inputData,
        setIsLoading
      );
      if (error) {
        handleAxiosError(error, setPopup);
      }
      // console.log({ error });
    })();
  }, []);
};
