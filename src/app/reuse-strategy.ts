// src/app/reuse-strategy.ts
import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy } from '@angular/router';

export class CustomReuseStrategy implements RouteReuseStrategy {
  private storedHandles = new Map<string, DetachedRouteHandle>();

  // Should we detach this route (store it)?
  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return route.routeConfig?.path === 'tablefromurl'; // cache only this component
  }

  // Store the detached route
  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    if (handle) {
      this.storedHandles.set(route.routeConfig!.path!, handle);
    }
  }

  // Should we reattach the stored route?
  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return !!route.routeConfig && this.storedHandles.has(route.routeConfig.path!);
  }

  // Retrieve the stored route
  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    if (!route.routeConfig) return null;
    return this.storedHandles.get(route.routeConfig.path!) || null;
  }

  // Should this route be reused?
  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return future.routeConfig === curr.routeConfig;
  }
}
