import { authkitMiddleware } from '@workos-inc/authkit-nextjs';

export default authkitMiddleware();

// Match against pages that require authentication
// Leave this out if you want authentication on every page in your application
export const config = { matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'] };