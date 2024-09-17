import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { AppHarness } from '@app/testing';
import { Component } from '@angular/core';

describe('AppComponent', () => {
  @Component({
    template: `<app-root />`,
  })
  class TestComponent {}

  async function setupTest() {
    TestBed.configureTestingModule({
      imports: [AppComponent],
      declarations: [TestComponent],
      providers: [provideRouter(appRoutes)]
    });

    const harnessLoader = TestbedHarnessEnvironment.loader(TestBed.createComponent(TestComponent));

    return {
      harness: await harnessLoader.getHarness(AppHarness),
    };
  }

  // This works when running `npx vitest` but doesn't work with `npx nx test front-end-angular`
  it(`should create component`, () => {
    setupTest().then(({ harness }) => expect(harness).not.toBeNull());
  });

  // This doesn't work with either command
  // Ideally I want to write tests like this and then run `npx nx test front-end-angular`
  // it(`should create component`, async () => {
  //   const { harness } = await setupTest();
  //   expect(harness).not.toBeNull();
  // });
});
