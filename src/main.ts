import { bootstrapApplication } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { filter, take } from 'rxjs';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .then((appRef) => {
    // Tell the intro animation in index.html that the first page has rendered
    const router = appRef.injector.get(Router);
    const notifyReady = () => window.dispatchEvent(new Event('app-ready'));

    if (router.navigated) {
      notifyReady();
    } else {
      router.events
        .pipe(filter((event) => event instanceof NavigationEnd), take(1))
        .subscribe(() => setTimeout(notifyReady));
    }
  })
  .catch((err) => console.error(err));
