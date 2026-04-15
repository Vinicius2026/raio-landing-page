"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { trackEvent } from "@/lib/meta-pixel";

const CHECKOUT_HREF = "#";

function handleCta() {
  trackEvent("InitiateCheckout", {
    content_name: "Bastidores VDA - Sticky",
    value: 34,
    currency: "BRL",
  });
}

export default function StickyCtaMobile() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShow(window.scrollY > 420);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 95, damping: 22 }}
          className="fixed bottom-0 left-0 right-0 z-50 px-4 pt-4 pb-5 md:hidden"
          style={{
            background: "rgba(11,11,11,0.95)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <motion.a
            href={CHECKOUT_HREF}
            onClick={handleCta}
            target="_blank"
            rel="noopener noreferrer"
            whileTap={{ scale: 0.975 }}
            className="flex items-center justify-center w-full rounded-2xl cursor-pointer overflow-hidden py-4 px-6"
            style={{
              background: "linear-gradient(135deg, #c8a020 0%, #f0d060 40%, #e8c840 70%, #c8a020 100%)",
              boxShadow: "0 0 0 1px rgba(245,158,11,0.2), 0 6px 28px rgba(245,158,11,0.28)",
            }}
          >
            <span className="text-[14px] font-black text-black tracking-wider uppercase">
              Quero entrar agora — R$34
            </span>
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
