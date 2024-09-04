/**
 * Routes accessible to the public
 * Doesn't need authentication
 * @type {string[]}
 */
export const publicRoutes = ["/", "/faq", "/about"];

/**
 * Regular expressions for dynamic public routes
 * @type {RegExp[]}
 */
export const publicRoutePatterns = [
  /^\/topics\/[^\/]+$/,
  /^\/topics\/[^\/]+\/posts\/[^\/]+$/,
];

/**
 * Routes that are used for authentication
 * @type {string[]}
 */
export const authRoutes = ["/auth/register", "/auth/login"];

/**
 * Routes will redirect users to /
 * @type {string}
 */
export const DEFAULT_HOME_REDIRECT = "/";

/**
 * Routes will redirect users to /auth/login
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/auth/login";
