import { useEffect } from 'react';

export default function useCustomBack(customBack: () => void) {
  useEffect(() => {
    (() => {
      history.pushState(null, '', location.href);
      window.addEventListener('popstate', customBack);
    })();

    return () => {
      window.removeEventListener('popstate', customBack);
    };
  }, [customBack]);
}