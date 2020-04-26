import HomePage from "../pages/home.jsx";
import SocialPage from "../pages/social.jsx";
import AboutPictogramsPage from "../pages/aboutPictograms.jsx";
import AboutPWAPage from "../pages/aboutPWA.jsx";
import FormPage from "../pages/form.jsx";
import NewPage from "../pages/new.jsx";
import LoginPage from "../pages/login.jsx";
import CreatePage from "../pages/create.jsx";

import DynamicRoutePage from "../pages/dynamic-route.jsx";
import RequestAndLoad from "../pages/request-and-load.jsx";
import NotFoundPage from "../pages/404.jsx";

var routes = [
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/new/:id",
    component: NewPage,
  },
  {
    path: "/about-pictograms/",
    component: AboutPictogramsPage,
  },
  {
    path: "/about-pwa/",
    component: AboutPWAPage,
  },
  {
    path: "/social/",
    component: SocialPage,
  },
  {
    path: "/create/",
    component: CreatePage,
  },
  {
    path: "/login/",
    component: LoginPage,
  },
  {
    path: "/form/",
    component: FormPage,
  },

  {
    path: "/dynamic-route/blog/:blogId/post/:postId/",
    component: DynamicRoutePage,
  },
  {
    path: "/request-and-load/user/:userId/",
    async: function (routeTo, routeFrom, resolve, reject) {
      // Router instance
      var router = this;

      // App instance
      var app = router.app;

      // Show Preloader
      app.preloader.show();

      // User ID from request
      var userId = routeTo.params.userId;

      // Simulate Ajax Request
      setTimeout(function () {
        // We got user data from request
        var user = {
          firstName: "Vladimir",
          lastName: "Kharlampidi",
          about: "Hello, i am creator of Framework7! Hope you like it!",
          links: [
            {
              title: "Framework7 Website",
              url: "http://framework7.io",
            },
            {
              title: "Framework7 Forum",
              url: "http://forum.framework7.io",
            },
          ],
        };
        // Hide Preloader
        app.preloader.hide();

        // Resolve route to load page
        resolve(
          {
            component: RequestAndLoad,
          },
          {
            context: {
              user: user,
            },
          }
        );
      }, 1000);
    },
  },
  {
    path: "(.*)",
    component: NotFoundPage,
  },
];

export default routes;
