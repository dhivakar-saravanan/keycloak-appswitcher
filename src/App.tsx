import { useEffect, useState } from "react";
import { useOidc } from "./oidc/oidc";
import { initializeApiManager } from './redux/features/api/apiAsyncThunk';
import { ApiManager } from './api/api-manager';
import { useTheme } from "@mui/material";
import { MyOrganizationRepresentation } from "./libs/phasetwo-orgs-api/src/lib";
import AppLayout from "./components/AppLayout";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from './redux/store/store';

type Applications = {
  [key: string]: MyOrganizationRepresentation;
};

function getTenant(): string {
  const { hostname } = window.location;

  if (hostname === "localhost") {
    return "";
  }

  try {
    const domainParts = hostname.split(".");
    const hostnameParts = domainParts[0].split("-");
    return hostnameParts[2];
  } catch (error) {
    console.error("Error getting domain name:", error);
    return "";
  }
}

export function App() {
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const { isUserLoggedIn, login, logout, oidcTokens } = useOidc();
  const [applications, setApplications] = useState<Applications | null>(null);
  const app = "ehq";
  const tenant = getTenant();
  const appTitle = tenant ? `ehq (${tenant})` : `ehq`;
  let hasAccess = false;
  const apiManager = useSelector((state: { api: { apiManager: ApiManager } }) => state.api.apiManager);

  useEffect(() => {
    if (!apiManager) {
      dispatch(initializeApiManager());
    }
  }, [apiManager, dispatch]);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const organizations = await apiManager.fetchP2OrganizationsOrgsGetMe();
        setApplications(organizations);
      } catch (error) {
        console.error("Error fetching client details:", error);
      }
    };

    fetchMe();
  }, [apiManager]);

  if (applications) {
    if (window.location.hostname === "localhost") {
      hasAccess = true;
    } else {
      Object.keys(applications).forEach((key) => {
        if (applications[key]?.name === tenant) {
          if (applications[key]?.roles?.includes(app)) {
            hasAccess = true;
          }
        }
      });
    }
  }

  return (
    <AppLayout
      applications={applications}
      theme={theme}
      isUserLoggedIn={isUserLoggedIn}
      login={login!}
      logout={logout!}
      oidcTokens={oidcTokens}
      appTitle={appTitle}
      appTitleStyled={
        <>
          <span>gov</span>
          <span style={{ fontWeight: 300 }}>D</span>
        </>
      }
      hasAccess={hasAccess}
    />
  );
}

export default App;
