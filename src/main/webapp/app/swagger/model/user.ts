/**
 * investApplication3 API
 * investApplication3 API documentation
 *
 * OpenAPI spec version: 0.0.1
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

export interface User {
  activated: boolean;
  email?: string;
  firstName?: string;
  id?: number;
  imageUrl?: string;
  langKey?: string;
  lastName?: string;
  login: string;
  resetDate?: Date;
}