import { BrowserRouter } from "react-router-dom";
import Router from "../components/Router";
import Signin from "../components/Signin";
import TopBar from "../components/TopBar";
import { getUser, signOut } from "../scripts/supabaseClient";
import { useState, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export default function Top() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const f = async () => {
      const u = await getUser();
      setUser(() => u);
    };
    setIsLoading(true);
    f()
      .then(() => {
        setIsLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setIsLoading(false);
      });
  }, []);

  const logout = async () => {
    await signOut();
    setUser(null);
  };

  return (
    <>
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "#000",
        }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <BrowserRouter>
        <TopBar user={user} logout={logout} />
        {isLoading ? <></> : user ? <Router /> : <Signin />}
      </BrowserRouter>
    </>
  );
}
