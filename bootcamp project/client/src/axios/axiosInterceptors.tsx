import axios from "axios";
import { stopLoader, startLoader } from "../redux/loaderSlice";
import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../redux/store";
import GlobalErorrModel from "../components/globalErorModel";
import useHistory, { Link } from 'react-router-dom';
import GlobalModelDialog from "../components/globalModelDialog";

interface GlobalAxiosState {
  Error: boolean;
}
const Axios: React.FC<GlobalAxiosState> = () => {
  const dispatch = useAppDispatch();
  const [Error, setError] = useState(false);
  const [Relogin, setRelogin] = useState(false);

  useEffect(() => {
    setError(false);
  }, []);

  const requestInterceptor = axios.interceptors.request.use(
    (config: any) => {
      let accessToken = sessionStorage.getItem("accessToken");
      {
        config.headers["Authorization"] = accessToken;
      }
      console.log(config);
      dispatch(startLoader());
      return config;
    },
    (error: any) => {
      dispatch(stopLoader());
      return Promise.reject(error);
    }
  );
  const responseInterceptor = axios.interceptors.response.use(
    (response: any) => {
      dispatch(stopLoader());
      return response;
    },
    (error: any) => {
      dispatch(stopLoader());
      if (error.response.status == 500) {
        setError(true);
      }
      if (error.response.status == 401) {
        alert("you need to relogin");
      }
      return Promise.reject(error);
    }
  );

  return (
    <>{Error ? <GlobalErorrModel onClose={() => setError(false)} /> : null}
    </>
  );
};
export default Axios;
