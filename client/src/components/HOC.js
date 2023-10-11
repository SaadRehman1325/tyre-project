import React, { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/UserContext";
import { useRouter } from "next/router";

const withAuthentication = (WrappedComponent) => {
  const WithAuthentication = (props) => {
    const router = useRouter();
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
      if (!currentUser) {
        router.push("/login");
      }
    }, [currentUser, router]);

    // Render the wrapped component for authenticated users on the client-side
    if (typeof window !== "undefined" && !currentUser) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return WithAuthentication;
};

export default withAuthentication;
