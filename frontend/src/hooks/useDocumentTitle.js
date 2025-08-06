import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useDocumentTitle = (customTitle = null) => {
  const location = useLocation();
  const baseTitle = 'Simple Blog';

  useEffect(() => {
    let pageTitle = baseTitle;

    if (customTitle) {
      pageTitle = `${customTitle} | ${baseTitle}`;
    } else {
      // Map routes to page titles
      const routeTitleMap = {
        '/': 'Home',
        '/create-blog': 'Create Blog',
        '/my-blogs': 'My Blogs',
        '/profile': 'Profile',
        '/blog/': 'Blog Post',
        '/edit-blog/': 'Edit Blog',
        '/user/': 'User Profile'
      };

      // Handle dynamic routes (with parameters)
      let title = null;
      
      if (location.pathname === '/') {
        title = routeTitleMap['/'];
      } else if (location.pathname.startsWith('/blog/')) {
        title = routeTitleMap['/blog/'];
      } else if (location.pathname.startsWith('/edit-blog/')) {
        title = routeTitleMap['/edit-blog/'];
      } else if (location.pathname.startsWith('/user/')) {
        title = routeTitleMap['/user/'];
      } else {
        // Direct match for static routes
        title = routeTitleMap[location.pathname];
      }

      if (title) {
        pageTitle = `${title} | ${baseTitle}`;
      } else if (location.pathname !== '/') {
        // Fallback for unknown routes
        pageTitle = `Page Not Found | ${baseTitle}`;
      }
    }

    document.title = pageTitle;
  }, [location.pathname, customTitle, baseTitle]);
};

export default useDocumentTitle;
