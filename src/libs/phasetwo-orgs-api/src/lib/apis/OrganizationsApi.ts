/* tslint:disable */
/* eslint-disable */
/**
 * Phase Two Admin REST API
 * This is a REST API reference for the Phase Two Keycloak custom resources. These are extensions to the standard [Keycloak Admin REST API](https://www.keycloak.org/docs-api/17.0/rest-api/index.html).  ### Base URI format Paths specified in the documentation are relative to the the base URI. - Format: `https://<host>:<port>/auth/realms` - Example: `https://app.phasetwo.io/auth/realms`  ### Authentication Authentication is achieved by using the `Authentication: Bearer <token>` header in all requests. This is either the access token received from a normal authentication, or by a request directly to the OpenID Connect token endpoint.  It is recommended that you use a Keycloak Admin Client, such as [this one for Javascript](https://github.com/keycloak/keycloak-nodejs-admin-client), as they take care of authentication, getting an access token, and refreshing it when it expires.  #### Client credentials grant example ``` POST /auth/realms/test-realm/protocol/openid-connect/token Host: app.phasetwo.io Accept: application/json Content-type: application/x-www-form-urlencoded  grant_type=client_credentials&client_id=admin-cli&client_secret=fd649804-3a74-4d69-acaa-8f065c6b7da1 ```  #### Password grant example ``` POST /auth/realms/test-realm/protocol/openid-connect/token Host: app.phasetwo.io Accept: application/json Content-type: application/x-www-form-urlencoded  grant_type=password&username=uname@foo.com&password=pwd123AZY&client_id=admin-cli ```  ### SDKs Modern API libraries are available for several common languages. These are available as open source at the links below, or you can choose to generate your own using our [OpenAPI spec file](https://raw.githubusercontent.com/p2-inc/phasetwo-docs/master/openapi.yaml).  | Language | Library | | --- | --- | | Java (and other JVM langs) | https://github.com/p2-inc/phasetwo-java | | JavaScript/TypeScript | https://github.com/p2-inc/phasetwo-js | | Python | https://github.com/p2-inc/phasetwo-python | 
 *
 * The version of the OpenAPI document: v1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  MyOrganizationRepresentation,
  OrganizationRepresentation,
  PortalLinkRepresentation,
} from '../models/index';
import {
    MyOrganizationRepresentationFromJSON,
    MyOrganizationRepresentationToJSON,
    OrganizationRepresentationFromJSON,
    OrganizationRepresentationToJSON,
    PortalLinkRepresentationFromJSON,
    PortalLinkRepresentationToJSON,
} from '../models/index';

export interface CreateOrganizationRequest {
    realm: string;
    organizationRepresentation: OrganizationRepresentation;
}

export interface CreatePortalLinkRequest {
    realm: string;
    orgId: string;
    userId?: string;
}

export interface DeleteOrganizationRequest {
    realm: string;
    orgId: string;
}

export interface GetMeRequest {
    realm: string;
}

export interface GetOrganizationByIdRequest {
    realm: string;
    orgId: string;
}

export interface GetOrganizationsRequest {
    realm: string;
    search?: string;
    first?: number;
    max?: number;
    q?: string;
}

export interface GetOrganizationsCountRequest {
    realm: string;
    search?: string;
}

export interface UpdateOrganizationRequest {
    realm: string;
    orgId: string;
    organizationRepresentation: OrganizationRepresentation;
}

/**
 * 
 */
export class OrganizationsApi extends runtime.BaseAPI {

    /**
     * Create a new organization
     */
    async createOrganizationRaw(requestParameters: CreateOrganizationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters['realm'] == null) {
            throw new runtime.RequiredError(
                'realm',
                'Required parameter "realm" was null or undefined when calling createOrganization().'
            );
        }

        if (requestParameters['organizationRepresentation'] == null) {
            throw new runtime.RequiredError(
                'organizationRepresentation',
                'Required parameter "organizationRepresentation" was null or undefined when calling createOrganization().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("access_token", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/{realm}/orgs`.replace(`{${"realm"}}`, encodeURIComponent(String(requestParameters['realm']))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: OrganizationRepresentationToJSON(requestParameters['organizationRepresentation']),
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Create a new organization
     */
    async createOrganization(requestParameters: CreateOrganizationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.createOrganizationRaw(requestParameters, initOverrides);
    }

    /**
     * Create a link for this organizations admin portal. This link encodes an action token on behalf of the organization\'s default admin user, or the user that is optionally specified in this request. The user specified must be a member of this organization, and have full organization admin roles.
     * Create a link for the organization\'s admin portal
     */
    async createPortalLinkRaw(requestParameters: CreatePortalLinkRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<PortalLinkRepresentation>> {
        if (requestParameters['realm'] == null) {
            throw new runtime.RequiredError(
                'realm',
                'Required parameter "realm" was null or undefined when calling createPortalLink().'
            );
        }

        if (requestParameters['orgId'] == null) {
            throw new runtime.RequiredError(
                'orgId',
                'Required parameter "orgId" was null or undefined when calling createPortalLink().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("access_token", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const consumes: runtime.Consume[] = [
            { contentType: 'application/x-www-form-urlencoded' },
        ];
        // @ts-ignore: canConsumeForm may be unused
        const canConsumeForm = runtime.canConsumeForm(consumes);

        let formParams: { append(param: string, value: any): any };
        let useForm = false;
        if (useForm) {
            formParams = new FormData();
        } else {
            formParams = new URLSearchParams();
        }

        if (requestParameters['userId'] != null) {
            formParams.append('userId', requestParameters['userId'] as any);
        }

        const response = await this.request({
            path: `/{realm}/orgs/{orgId}/portal-link`.replace(`{${"realm"}}`, encodeURIComponent(String(requestParameters['realm']))).replace(`{${"orgId"}}`, encodeURIComponent(String(requestParameters['orgId']))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: formParams,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => PortalLinkRepresentationFromJSON(jsonValue));
    }

    /**
     * Create a link for this organizations admin portal. This link encodes an action token on behalf of the organization\'s default admin user, or the user that is optionally specified in this request. The user specified must be a member of this organization, and have full organization admin roles.
     * Create a link for the organization\'s admin portal
     */
    async createPortalLink(requestParameters: CreatePortalLinkRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<PortalLinkRepresentation> {
        const response = await this.createPortalLinkRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Delete the organization
     */
    async deleteOrganizationRaw(requestParameters: DeleteOrganizationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters['realm'] == null) {
            throw new runtime.RequiredError(
                'realm',
                'Required parameter "realm" was null or undefined when calling deleteOrganization().'
            );
        }

        if (requestParameters['orgId'] == null) {
            throw new runtime.RequiredError(
                'orgId',
                'Required parameter "orgId" was null or undefined when calling deleteOrganization().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("access_token", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/{realm}/orgs/{orgId}`.replace(`{${"realm"}}`, encodeURIComponent(String(requestParameters['realm']))).replace(`{${"orgId"}}`, encodeURIComponent(String(requestParameters['orgId']))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Delete the organization
     */
    async deleteOrganization(requestParameters: DeleteOrganizationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.deleteOrganizationRaw(requestParameters, initOverrides);
    }

    /**
     * Get a list of all organizations that the user is a member and their roles in those organizations. Similar idea to /userinfo in OIDC.
     * Get orgs and roles for authenticated user
     */
    async getMeRaw(requestParameters: GetMeRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<{ [key: string]: MyOrganizationRepresentation; }>> {
        if (requestParameters['realm'] == null) {
            throw new runtime.RequiredError(
                'realm',
                'Required parameter "realm" was null or undefined when calling getMe().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("access_token", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/{realm}/orgs/me`.replace(`{${"realm"}}`, encodeURIComponent(String(requestParameters['realm']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => runtime.mapValues(jsonValue, MyOrganizationRepresentationFromJSON));
    }

    /**
     * Get a list of all organizations that the user is a member and their roles in those organizations. Similar idea to /userinfo in OIDC.
     * Get orgs and roles for authenticated user
     */
    async getMe(requestParameters: GetMeRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<{ [key: string]: MyOrganizationRepresentation; }> {
        const response = await this.getMeRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Get organization by id
     */
    async getOrganizationByIdRaw(requestParameters: GetOrganizationByIdRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<OrganizationRepresentation>> {
        if (requestParameters['realm'] == null) {
            throw new runtime.RequiredError(
                'realm',
                'Required parameter "realm" was null or undefined when calling getOrganizationById().'
            );
        }

        if (requestParameters['orgId'] == null) {
            throw new runtime.RequiredError(
                'orgId',
                'Required parameter "orgId" was null or undefined when calling getOrganizationById().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("access_token", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/{realm}/orgs/{orgId}`.replace(`{${"realm"}}`, encodeURIComponent(String(requestParameters['realm']))).replace(`{${"orgId"}}`, encodeURIComponent(String(requestParameters['orgId']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => OrganizationRepresentationFromJSON(jsonValue));
    }

    /**
     * Get organization by id
     */
    async getOrganizationById(requestParameters: GetOrganizationByIdRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<OrganizationRepresentation> {
        const response = await this.getOrganizationByIdRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Get a paginated list of organizations using optional search query parameters.
     * Get organizations
     */
    async getOrganizationsRaw(requestParameters: GetOrganizationsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<OrganizationRepresentation>>> {
        if (requestParameters['realm'] == null) {
            throw new runtime.RequiredError(
                'realm',
                'Required parameter "realm" was null or undefined when calling getOrganizations().'
            );
        }

        const queryParameters: any = {};

        if (requestParameters['search'] != null) {
            queryParameters['search'] = requestParameters['search'];
        }

        if (requestParameters['first'] != null) {
            queryParameters['first'] = requestParameters['first'];
        }

        if (requestParameters['max'] != null) {
            queryParameters['max'] = requestParameters['max'];
        }

        if (requestParameters['q'] != null) {
            queryParameters['q'] = requestParameters['q'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("access_token", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/{realm}/orgs`.replace(`{${"realm"}}`, encodeURIComponent(String(requestParameters['realm']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(OrganizationRepresentationFromJSON));
    }

    /**
     * Get a paginated list of organizations using optional search query parameters.
     * Get organizations
     */
    async getOrganizations(requestParameters: GetOrganizationsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<OrganizationRepresentation>> {
        const response = await this.getOrganizationsRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Get a count of organizations using an optional search query.
     * Get organizations count
     */
    async getOrganizationsCountRaw(requestParameters: GetOrganizationsCountRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<number>> {
        if (requestParameters['realm'] == null) {
            throw new runtime.RequiredError(
                'realm',
                'Required parameter "realm" was null or undefined when calling getOrganizationsCount().'
            );
        }

        const queryParameters: any = {};

        if (requestParameters['search'] != null) {
            queryParameters['search'] = requestParameters['search'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("access_token", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/{realm}/orgs/count`.replace(`{${"realm"}}`, encodeURIComponent(String(requestParameters['realm']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        if (this.isJsonMime(response.headers.get('content-type'))) {
            return new runtime.JSONApiResponse<number>(response);
        } else {
            return new runtime.TextApiResponse(response) as any;
        }
    }

    /**
     * Get a count of organizations using an optional search query.
     * Get organizations count
     */
    async getOrganizationsCount(requestParameters: GetOrganizationsCountRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<number> {
        const response = await this.getOrganizationsCountRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Update this organization by id
     */
    async updateOrganizationRaw(requestParameters: UpdateOrganizationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters['realm'] == null) {
            throw new runtime.RequiredError(
                'realm',
                'Required parameter "realm" was null or undefined when calling updateOrganization().'
            );
        }

        if (requestParameters['orgId'] == null) {
            throw new runtime.RequiredError(
                'orgId',
                'Required parameter "orgId" was null or undefined when calling updateOrganization().'
            );
        }

        if (requestParameters['organizationRepresentation'] == null) {
            throw new runtime.RequiredError(
                'organizationRepresentation',
                'Required parameter "organizationRepresentation" was null or undefined when calling updateOrganization().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("access_token", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/{realm}/orgs/{orgId}`.replace(`{${"realm"}}`, encodeURIComponent(String(requestParameters['realm']))).replace(`{${"orgId"}}`, encodeURIComponent(String(requestParameters['orgId']))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: OrganizationRepresentationToJSON(requestParameters['organizationRepresentation']),
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Update this organization by id
     */
    async updateOrganization(requestParameters: UpdateOrganizationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.updateOrganizationRaw(requestParameters, initOverrides);
    }

}
