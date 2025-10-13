'use client';

import { useEffect } from 'react';

export default function AccessibilityWidget() {
  useEffect(() => {
    // Xóa nếu script đã tồn tại
    if (document.getElementById('aioa-adawidget')) return;

    const timeout = setTimeout(() => {
      const script = document.createElement('script');
      script.src =
        'https://www.skynettechnologies.com/accessibility/js/all-in-one-accessibility-js-widget-minify.js?colorcode=#420083&token=ADAAIOA-AD61A8D6650F87000AFEF13DF3A7B68D&position=bottom_right';
      script.id = 'aioa-adawidget';
      document.body.appendChild(script);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return null; // không cần render gì cả
}
