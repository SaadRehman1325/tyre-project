import Image from "next/image";
import React from "react";

export default function WhatsappIcon() {
  function openWhatsApp() {
    const isWhatsAppInstalled = () => {
      const link = document.createElement("a");
      link.href = "whatsapp://send";
      return typeof link.href === "string" && link.href !== "";
    };

    var phoneNumber = "447577769666";
    const url = `https://web.whatsapp.com/send?phone=${phoneNumber}`;

    // Check if WhatsApp app is installed
    if (isWhatsAppInstalled()) {
      window.open(
        `https://api.whatsapp.com/send?phone=${phoneNumber}`,
        "_blank"
      );
    } else {
      window.open(url, "_blank");
    }
  }

  return (
    <div className="floating-icon">
      <a onClick={openWhatsApp} role="button">
        <Image
          alt="Logo"
          src={"/images/whatsapp-icon.svg"}
          className="whatsapp-img"
          fill={true}
        />
      </a>
    </div>
  );
}
