"use client";

import React, { useCallback, useEffect, useRef } from "react";
import * as jose from "jose";

const Refresher = ({ children }: { children: React.ReactNode }) => {
  const timeOutId = useRef<NodeJS.Timeout>(undefined);
  const getAccessToken = async () => {
    const res = fetch("api/auth/accessToken");

    if (!(await res).ok) {
      return;
    }

    const accessToken = await (await res).json();
    return accessToken?.token;
  };
  const startRefresh = useCallback(async () => {
    try {
      if (timeOutId.current) {
        clearTimeout(timeOutId.current);
      }
      const accessToken: string = await getAccessToken();

      if (!accessToken) {
        return;
      }
      const token = jose.decodeJwt(accessToken);

      const expiryTime = token.exp! * 1000;
      const currentTime = Date.now(); //converted into millisecond
      const refreshTime = expiryTime - currentTime - 6000; // refresh before 6 second

      timeOutId.current = setTimeout(() => {
        refreshAccessToken();
        console.log("refreshing token");
      }, refreshTime);

      //parse it
    } catch (error: unknown) {
      console.log(error);
    }
  }, []);

  const refreshAccessToken = async () => {
    try {
      const res = fetch("api/auth/refresh");

      if (!(await res).ok) {
        return;
      }
    } catch (error: unknown) {
      console.error(error);
    }

    startRefresh();
  };

  useEffect(() => {
    startRefresh();

    return () => {
      clearTimeout(timeOutId.current);
    };
  }, [startRefresh]);

  return <>{children}</>;
};

export default Refresher;
