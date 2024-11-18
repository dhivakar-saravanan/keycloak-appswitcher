import {
  OrganizationsApi as P2OrganizationsApi,
  Configuration as P2OrganizationsApiConfiguration,
} from './../libs/phasetwo-orgs-api/src/lib';
import { Oidc } from 'oidc-spa';

const BASE_PATH = 'https://granicus.us-east-1.aws.auth.ac/auth';

export class ApiManager {
  private isInitialized = false;
  // P2 Orgs APIs
  private p2OrganizationsApiConfig: P2OrganizationsApiConfiguration | null =
    null;
  private p2OrganizationsApi: P2OrganizationsApi | null = null;

  public async initialize({ oidc }: { oidc: Oidc<Record<string, unknown>> }) {
    if (!this.isInitialized) {
      try {
        await this.initializeConfigAndApis({ oidc });
        this.isInitialized = true;
      } catch (error) {
        console.error('Error initializing API manager:', error);
      }
    }
  }

  private async initializeConfigAndApis({
    oidc,
  }: {
    oidc: Oidc<Record<string, unknown>>;
  }) {
    if (!oidc.isUserLoggedIn) {
      throw new Error('User is not logged in.');
    }

    const accessToken = await oidc.getTokens().accessToken;

    // P2 Orgs APIs
    this.p2OrganizationsApiConfig = new P2OrganizationsApiConfiguration({
      basePath: `${BASE_PATH}/realms`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    this.p2OrganizationsApi = new P2OrganizationsApi(
      this.p2OrganizationsApiConfig,
    );
  }

  // P2 Orgs API Methods
  public async fetchP2OrganizationsOrgsGetMe() {
    if (!this.p2OrganizationsApi) {
      throw new Error('OrganizationsApi is not initialized.');
    }

    return this.p2OrganizationsApi.getMe({
      realm: 'poc',
    });
  }
}

export default ApiManager;
