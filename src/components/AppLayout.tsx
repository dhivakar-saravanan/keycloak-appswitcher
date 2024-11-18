import {
  AppBar,
  Avatar,
  Box,
  Button,
  ButtonBase,
  Collapse,
  Container,
  IconButton,
  Theme,
  Toolbar,
  Typography,
  Card,
  CardContent,
} from '@mui/material';
import {
  HelpOutline,
  NotificationsNoneOutlined,
  AccountCircle,
  Remove,
  Add,
  Star,
  OpenInNew,
} from '@mui/icons-material';
import { MyOrganizationRepresentation } from './../libs/phasetwo-orgs-api/src/lib';
import { ReactElement, useState } from 'react';
import { Oidc } from 'oidc-spa';
import { purple, blue } from '@mui/material/colors';

const getColor = (index: number) => [purple[500], blue[500]][index % 2];

type AppLayoutProps = {
  applications: { [key: string]: MyOrganizationRepresentation } | null;
  theme: Theme;
  isUserLoggedIn: boolean;
  login?: Oidc.NotLoggedIn['login'];
  logout?: Oidc.LoggedIn['logout'];
  oidcTokens?: Readonly<{
    accessToken: string;
    idToken: string;
    refreshToken: string;
    decodedIdToken: {
      given_name?: string;
      family_name?: string;
      [key: string]: unknown;
    };
  }>;
  appTitleStyled: ReactElement;
  appTitle: string;
  hasAccess: boolean;
};

const AvatarButton = ({
  isUserLoggedIn,
  login,
  logout,
  oidcTokens,
}: {
  isUserLoggedIn: boolean;
  login?: Oidc.NotLoggedIn['login'];
  logout?: Oidc.LoggedIn['logout'];
  oidcTokens?: AppLayoutProps['oidcTokens'];
}) => {
  if (isUserLoggedIn) {
    const initials = `${oidcTokens?.decodedIdToken?.given_name?.[0]}${oidcTokens?.decodedIdToken?.family_name?.[0]}`;
    return (
      <ButtonBase onClick={() => logout!({ redirectTo: 'current page' })}>
        <Avatar>{initials}</Avatar>
      </ButtonBase>
    );
  }
  return (
    <IconButton onClick={() => login!({ doesCurrentHrefRequiresAuth: false })}>
      <AccountCircle />
    </IconButton>
  );
};

const AppRoles = ({ roles, applications }: { roles: { [key: string]: string[] }; applications: { [key: string]: MyOrganizationRepresentation } }) => (
  <>
    {Object.keys(roles).map((role, index) => {
      const appColor = getColor(index);
      return (
        <Box key={role} sx={{ marginBottom: 3 }}>
          <Typography variant="h2" sx={{ marginBottom: 2 }}>
            App: {role}
          </Typography>
          <Box display="flex" alignItems="center" gap={3} flexWrap="wrap">
            {roles[role]?.map((appId) => {
              const app = applications[appId];
              return (
                <Card key={appId} variant="outlined" sx={{ width: 250 }}>
                  <CardContent>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Avatar sx={{ bgcolor: appColor, marginBottom: 1 }}>
                        <Star />
                      </Avatar>
                      <Typography variant="h5" component="div">
                        {app?.displayName}
                      </Typography>
                    </Box>
                    <Typography variant="body2">Name: {app?.name}</Typography>
                    <Button
                      href={`https://granicus-${role}-${app?.name}.vercel.app`}
                      startIcon={<OpenInNew />}
                      size="small"
                      target="_blank"
                    >
                      Visit
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </Box>
        </Box>
      );
    })}
  </>
);

const AppLayout = ({
  applications,
  theme,
  isUserLoggedIn,
  login,
  logout,
  oidcTokens,
  appTitleStyled,
  appTitle,
  hasAccess,
}: AppLayoutProps) => {
  const [tokenExpanded, setTokenExpanded] = useState(false);

  // Aggregate roles
  const roles = applications
    ? Object.keys(applications).reduce((acc, key) => {
        applications[key]?.roles?.forEach((role) => {
          acc[role] = acc[role] ? [...acc[role], key] : [key];
        });
        return acc;
      }, {} as { [key: string]: string[] })
    : {};

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: theme.palette.grey[200], color: theme.palette.secondary.main, boxShadow: 'none' }}>
        <Toolbar>
          <IconButton size="large" color="inherit" sx={{ mr: 2 }}>
            <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
              <circle cx="2" cy="2" r="2" fill="#E5163D" />
              <circle cx="2" cy="18" r="2" fill="#E5163D" />
              <circle cx="10" cy="2" r="2" fill="#E5163D" />
              <circle cx="18" cy="10" r="2" fill="#E5163D" />
              <circle cx="10" cy="18" r="2" fill="#E5163D" />
              <circle cx="18" cy="2" r="2" fill="#E5163D" />
              <circle cx="18" cy="18" r="2" fill="#E5163D" />
              <circle cx="2" cy="10" r="2" fill="#E5163D" />
              <circle cx="10" cy="10" r="2" fill="#E5163D" />
            </svg>
          </IconButton>
          <Typography variant="h6" sx={{ fontWeight: 600, flexGrow: 1, color: theme.palette.text.primary }}>
            {appTitleStyled}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton>
              <HelpOutline />
            </IconButton>
            <IconButton>
              <NotificationsNoneOutlined />
            </IconButton>
            <AvatarButton isUserLoggedIn={isUserLoggedIn} login={login} logout={logout} oidcTokens={oidcTokens} />
          </Box>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg">
        <Typography variant="h1" sx={{ paddingTop: 5, marginBottom: 1, textAlign: 'center', fontWeight: 'bold', fontSize: '3rem', color: theme.palette.secondary.main }}>
          Welcome to {appTitle}
        </Typography>
        {!applications ? (
          <Typography variant="h6" sx={{ marginTop: 2 }}>
            No access to applications.
          </Typography>
        ) : isUserLoggedIn ? (
          hasAccess ? (
            <AppRoles roles={roles} applications={applications} />
          ) : (
            <Typography sx={{ marginTop: 2 }}>
              Your user does not have sufficient access. Please contact your administrator.
            </Typography>
          )
        ) : (
          <Typography sx={{ marginTop: 2 }}>Log in to view your apps.</Typography>
        )}
        {isUserLoggedIn && (
          <Box py={5}>
            <Button startIcon={tokenExpanded ? <Remove /> : <Add />} variant="outlined" onClick={() => setTokenExpanded(!tokenExpanded)} sx={{ marginBottom: 2 }}>
              View Token
            </Button>
            <Collapse in={tokenExpanded}>
              <Typography component="pre">{JSON.stringify(oidcTokens?.decodedIdToken, null, 2)}</Typography>
            </Collapse>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default AppLayout;
