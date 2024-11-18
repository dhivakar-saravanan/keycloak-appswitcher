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
  MagicLinkRepresentation,
  OrganizationRepresentation,
  OrganizationRoleRepresentation,
} from '../models/index';
import {
    MagicLinkRepresentationFromJSON,
    MagicLinkRepresentationToJSON,
    OrganizationRepresentationFromJSON,
    OrganizationRepresentationToJSON,
    OrganizationRoleRepresentationFromJSON,
    OrganizationRoleRepresentationToJSON,
} from '../models/index';

export interface CreateMagicLinkRequest {
    realm: string;
    magicLinkRepresentation: MagicLinkRepresentation;
}

export interface RealmUsersUserIdOrgsGetRequest {
    realm: string;
    userId: string;
}

export interface RealmUsersUserIdOrgsOrgIdRolesGetRequest {
    realm: string;
    userId: string;
    orgId: string;
}

/**
 * 
 */
export class UsersApi extends runtime.BaseAPI {

    /**
     * Create a magic link to log in a user
     */
    async createMagicLinkRaw(requestParameters: CreateMagicLinkRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters['realm'] == null) {
            throw new runtime.RequiredError(
                'realm',
                'Required parameter "realm" was null or undefined when calling createMagicLink().'
            );
        }

        if (requestParameters['magicLinkRepresentation'] == null) {
            throw new runtime.RequiredError(
                'magicLinkRepresentation',
                'Required parameter "magicLinkRepresentation" was null or undefined when calling createMagicLink().'
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
            path: `/{realm}/magic-link`.replace(`{${"realm"}}`, encodeURIComponent(String(requestParameters['realm']))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: MagicLinkRepresentationToJSON(requestParameters['magicLinkRepresentation']),
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Create a magic link to log in a user
     */
    async createMagicLink(requestParameters: CreateMagicLinkRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.createMagicLinkRaw(requestParameters, initOverrides);
    }

    /**
     * List organizations for the given user
     */
    async realmUsersUserIdOrgsGetRaw(requestParameters: RealmUsersUserIdOrgsGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<OrganizationRepresentation>>> {
        if (requestParameters['realm'] == null) {
            throw new runtime.RequiredError(
                'realm',
                'Required parameter "realm" was null or undefined when calling realmUsersUserIdOrgsGet().'
            );
        }

        if (requestParameters['userId'] == null) {
            throw new runtime.RequiredError(
                'userId',
                'Required parameter "userId" was null or undefined when calling realmUsersUserIdOrgsGet().'
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
            path: `/{realm}/users/{userId}/orgs`.replace(`{${"realm"}}`, encodeURIComponent(String(requestParameters['realm']))).replace(`{${"userId"}}`, encodeURIComponent(String(requestParameters['userId']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(OrganizationRepresentationFromJSON));
    }

    /**
     * List organizations for the given user
     */
    async realmUsersUserIdOrgsGet(requestParameters: RealmUsersUserIdOrgsGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<OrganizationRepresentation>> {
        const response = await this.realmUsersUserIdOrgsGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * List organization roles for the given user and org
     */
    async realmUsersUserIdOrgsOrgIdRolesGetRaw(requestParameters: RealmUsersUserIdOrgsOrgIdRolesGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<OrganizationRoleRepresentation>>> {
        if (requestParameters['realm'] == null) {
            throw new runtime.RequiredError(
                'realm',
                'Required parameter "realm" was null or undefined when calling realmUsersUserIdOrgsOrgIdRolesGet().'
            );
        }

        if (requestParameters['userId'] == null) {
            throw new runtime.RequiredError(
                'userId',
                'Required parameter "userId" was null or undefined when calling realmUsersUserIdOrgsOrgIdRolesGet().'
            );
        }

        if (requestParameters['orgId'] == null) {
            throw new runtime.RequiredError(
                'orgId',
                'Required parameter "orgId" was null or undefined when calling realmUsersUserIdOrgsOrgIdRolesGet().'
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
            path: `/{realm}/users/{userId}/orgs/{orgId}/roles`.replace(`{${"realm"}}`, encodeURIComponent(String(requestParameters['realm']))).replace(`{${"userId"}}`, encodeURIComponent(String(requestParameters['userId']))).replace(`{${"orgId"}}`, encodeURIComponent(String(requestParameters['orgId']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(OrganizationRoleRepresentationFromJSON));
    }

    /**
     * List organization roles for the given user and org
     */
    async realmUsersUserIdOrgsOrgIdRolesGet(requestParameters: RealmUsersUserIdOrgsOrgIdRolesGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<OrganizationRoleRepresentation>> {
        const response = await this.realmUsersUserIdOrgsOrgIdRolesGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
