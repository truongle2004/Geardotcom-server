import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(private configService: ConfigService) {}

  /**
   * Get roles from JWT payload
   */
  getRoles(payload: any): string[] {
    const realmAccess = payload.realm_access || {};
    return realmAccess.roles || [];
  }

  /**
   * Check if user has a specific role
   */
  hasRole(payload: any, role: string): boolean {
    const roles = this.getRoles(payload);
    return roles.includes(role);
  }

  /**
   * Check if user has any of the specified roles
   */
  hasAnyRole(payload: any, roles: string[]): boolean {
    const userRoles = this.getRoles(payload);
    return roles.some((role) => userRoles.includes(role));
  }

  /**
   * Check if user has all of the specified roles
   */
  hasAllRoles(payload: any, roles: string[]): boolean {
    const userRoles = this.getRoles(payload);
    return roles.every((role) => userRoles.includes(role));
  }

  /**
   * Get user ID from payload
   */
  getUserId(payload: any): string {
    return payload.sub || payload.userId || '';
  }

  /**
   * Get username from payload
   */
  getUsername(payload: any): string {
    return payload.preferred_username || payload.email || payload.sub || '';
  }
}
