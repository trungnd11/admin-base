
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { QueryClientProvider } from "react-query";
import { useIdleTimer } from "react-idle-timer";
import queryClient from "./config/queryClient";
import AuthorizedRouter from "./routers/AuthorizedRouter";
import ProtectedRouter from "./routers/ProtectedRouter";
import { useAppDispatch, useAppSelector } from "./store/reduxHook";
import { Authenticate } from "./enum/AuthorEnum";
import { getAuthorStore, getLogin, logout } from "./store/auth/auth";
import { getLocalStorage } from "./helper/localStorage";
import { handleLogout } from "./config/AxiosInterceptor";

const Container = lazy(async () => await import("./layout/Container/Container"));
const Login = lazy(async () => await import("./pages/login/Login"));

export default function App() {
  const timerLogout = getLocalStorage(Authenticate.TIME_OUT_LOGOUT);
  const dispatch = useAppDispatch();
  const { timeout } = useAppSelector(getAuthorStore);
  const auth = getLocalStorage(Authenticate.AUTH);

  const handleIdleTimer = () => {
    handleLogout(() => dispatch(logout()));
  };

  useIdleTimer({
    syncTimers: timeout,
    timeout: timerLogout ? Number(timerLogout) : undefined,
    onIdle: handleIdleTimer
  });

  if (auth) dispatch(getLogin());

  return (
    <QueryClientProvider client={queryClient}>
      <Suspense>
        <Routes>
          <Route
            path="/login"
            element={
              <ProtectedRouter>
                <Login />
              </ProtectedRouter>
            }
          />
          <Route
            path="*" element={
              <AuthorizedRouter>
                <Container />
              </AuthorizedRouter>}
          />
        </Routes>
      </Suspense>
    </QueryClientProvider>
  );
}
