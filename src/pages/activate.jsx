import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import ErrorView from "../components/errorView";

export default function ActivatePage() {
  const [isErrorViewShow, setIsErrorViewShow] = useState(false);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const email = searchParams.get("email");
  const activationString = searchParams.get("activationString");

  // API calls

  const activateAccount = async () => {
    const response = await axios
      .post(
        `${process.env.REACT_APP_URL}/activate`,
        {},
        {
          params: { email, activationString }
        }
      )
      .catch((error) => console.error("There was an error!", error));

    return response;
  };

  // Handle functions
  const handleActivateAccount = async () => {
    const response = await activateAccount();

    if (response?.status === 200)
      navigate("/login", { state: response.message });
    else setIsErrorViewShow(true);
  };

  const handleCloseError = () => {
    // Do nothing
  };

  useEffect(() => {
    handleActivateAccount();
  }, []);

  return (
    <Box sx={{ maxWidth: "xs" }}>
      <ErrorView
        isErrorShow={isErrorViewShow}
        handleCloseError={handleCloseError}
        errorMessage="Something is wrong with the verification stage, please try again later."
      />
      <Typography
        variant="h3"
        component="div"
        textTransform="uppercase"
        align="center"
        sx={{ flexGrow: 1 }}
      >
        Your account is being verified
      </Typography>
      <Typography
        variant="h6"
        component="div"
        align="center"
        sx={{ flexGrow: 1 }}
      >
        Please wait for a moment...
      </Typography>
    </Box>
  );
}
