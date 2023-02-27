import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import Box from "@mui/material/Box";
import { supabase } from "../scripts/supabaseClient";

export default function Signin() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "80px",
        }}
      >
        <Box sx={{ width: 400 }}>
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            providers={["google"]}
          />
        </Box>
      </Box>
    </>
  );
}
