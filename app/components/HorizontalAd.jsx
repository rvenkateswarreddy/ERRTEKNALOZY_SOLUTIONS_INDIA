"use client";
import { useEffect, useRef, useState } from "react";
// tracks whether push() was called

const HorizontalAd = () => {
  const [loaded, setLoaded] = useState(false);
  const adRef = useRef(null);
  const pushedRef = useRef(false);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.adsbygoogle &&
      adRef.current &&
      !pushedRef.current
    ) {
      try {
        window.adsbygoogle.push({});
        pushedRef.current = true; // mark that we've already pushed
      } catch (e) {
        console.error("AdSense error", e);
      }
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      ref={adRef}
      style={{ display: "block", height: "180px" }}
      data-ad-client="ca-pub-9174140322510860"
      data-ad-slot="7368053194"
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
};

export default HorizontalAd;
