import { RouteReuseStrategy, ActivatedRouteSnapshot, DetachedRouteHandle } from '@angular/router';

export class CacheRouteReuseStrategy implements RouteReuseStrategy {
    storedRouteHandles = new Map<string, DetachedRouteHandle>();

    allowRetrieveCache = {
        'feed': true,
        'search': true
    };

    shouldReuseRoute(prior: ActivatedRouteSnapshot, current: ActivatedRouteSnapshot): boolean {
        // if we navigate from the feed page to the search page, reuse the ChatComponent
        if (this.getPath(prior) === '' && this.getPath(current) === 'search') {
            this.allowRetrieveCache.search = true;
        } else {
            this.allowRetrieveCache.search = false;
        }
        // if we navigate from the search page to the feed page, reuse the ChatComponent
        if (this.getPath(prior) === 'search' && this.getPath(current) === '') {
            this.allowRetrieveCache.feed = true;
        } else {
            this.allowRetrieveCache.feed = false;
        }
        return prior.routeConfig === current.routeConfig;
    }

    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
        return this.storedRouteHandles.get(this.getPath(route)) as DetachedRouteHandle;
    }

    shouldAttach(route: ActivatedRouteSnapshot): boolean {
        const path = this.getPath(route);
        if (this.allowRetrieveCache[path]) {
            return this.storedRouteHandles.has(
                this.getPath(route));
        } else {
            return false;
        }
    }

    shouldDetach(route: ActivatedRouteSnapshot): boolean {
        const path = this.getPath(route);
        if (this.allowRetrieveCache.hasOwnProperty('path')) {
            return true;
        } else {
            return false;
        }
    }
    store(route: ActivatedRouteSnapshot, detachedTree: DetachedRouteHandle): void {
        this.storedRouteHandles.set(
            this.getPath(route), detachedTree);
    }
    private getPath(route: ActivatedRouteSnapshot): string {
        if (route.routeConfig !== null && route.routeConfig.path !== null) {
            return route.routeConfig.path;
        } else {
            return '';
        }
    }
}
