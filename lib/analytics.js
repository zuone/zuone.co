// import { useRouter } from 'next/router';
// import { useEffect } from 'react';
// import * as Fathom from 'fathom-client';

// export const useAnalytics = () => {
//   const router = useRouter();

//   useEffect(() => {
//      Fathom.load(process.env.NEXT_PUBLIC_FATHOM_SITE_ID, {
//        includedDomains: ['zuozizhen.com','www.zuozizhen.com']
//      });

//     function onRouteChangeComplete() {
//       Fathom.trackPageview();
//     }

//     router.events.on('routeChangeComplete', onRouteChangeComplete);

//     return () => {
//       router.events.off('routeChangeComplete', onRouteChangeComplete);
//     };
//   }, []);
// };
