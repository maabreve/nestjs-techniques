## [JWT](https://tools.ietf.org/html/rfc7519)

#### Payload
  - statements about an entity (typically, the user) and additional data
  - Three types:
    - Registered: not mandatory but recommended, to provide a set of useful, interoperable claims [(iss, sub, aud, ...)]((https://tools.ietf.org/html/rfc7519#section-4.1))
    - Public: custom claims names that are required to be collision resistant. Their names should be UUIDs or prefixed by a URL to create a safe namespace for them and avoid collisions
    - Private: custom claims created to share information between parties that agree on using them and are neither registered or public claims.

  - [Security and best practices](https://auth0.com/docs/best-practices/token-best-practices):
    - [Size: 4k limit](https://cheatsheetseries.owasp.org/cheatsheets/HTML5_Security_Cheat_Sheet.html#local-storage) - It allows front-end store in cookies (max length 4k), instead of local/session storage (lack of security)
    - [Use HTTPS](https://auth0.com/docs/best-practices/token-best-practices)
    - [Do not add sensitive data to the payload](https://auth0.com/docs/best-practices/token-best-practices)
    - Always validate signature (with the method validate() from PassportStrategy base class)


    - Reading
      - [JWT cheat sheets](https://pragmaticwebsecurity.com/files/cheatsheets/jwt.pdf)
      - [ietf.org](https://tools.ietf.org/id/draft-ietf-oauth-jwt-bcp-02.html)
      - [Auth0 jwt security](https://auth0.com/blog/a-look-at-the-latest-draft-for-jwt-bcp)


### Fine grained roles, claims
  - Authentication claims: regarding user access to application
  - Authorization API: regarding CRUD or custom permissions to backend api
  - Authorization Session: regarding front-end claims (eg: print, show/hide button)

#### Discussion - Roles and claims management and code integration
  - Best practices says authentication and authorization (claims) must be apart from applications apis:
    - Api integration - Is it possible to create guards dynamically or must be hard coded in routes?
    - How to manage jwt 4k size limit
    - JWT payload are not encrypted. Encrypt/Decrypt JWT payload? [node bcrypt](https://github.com/kelektiv/node.bcrypt.js#readme)

#### JWT short example LinOS
```
{
  "iss": "https://www.linosexample.com",
  "aud": "application-managers",
  "sub": "123456",
  "exp": 1499863217,
  "roles": [
    {
      "role": "USR5",
      "claims": {
        "api": [
          "inbound:read",
          "inbound:create",
          "inbound:update",
          "inbound:delete",
          "outbound:read",
          "outbound:create",
          "outbound:update",
          "outbound:delete",
          "schedule:create",
          "schedule:update",
          "schedule:read",
          "schedule:delete"
        ],
        "session": [
          "inbound:print",
          "inbound:exit",
          "outbound:print",
          "outbound:exit",
          "scheduling:exit",
          "scheduling:print"
        ]
      }
    }
  ]
}
```


#### An implementation example using Nestjs
 - 1. Create a decorator for claims

  claims.decorator.ts
  ```
  import { SetMetadata } from '@nestjs/common';

  export const UseClaims = (...claims: string[]) =>
  SetMetadata('claims', claims);
  ```

- 2. Create a guard for claims

claims.guard.ts - check if the decorator claim is present in the claims from Authorization server
```
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class ClaimsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const routeClaims = this.reflector.get<string[]>(
      'claims',
      context.getHandler(),
    );

    const userClaims = context.getArgs()[0].user.claims;
    if (!routeClaims) {
      return true;
    }

    const hasPermission = () =>
      routeClaims.every(routePermission =>
        userClaims.includes(routePermission),
      );

    return hasPermission();
  }
}
```

- 3. Use the guard and the decorator in the route controller

```
@UseGuards(AuthGuard('jwt'), ClaimsGuard)
  @UseClaims('read:item') @Get()
  async getAll(): Promise<Item[]> {
    return await this.itemsService.findAll();
  }
```
