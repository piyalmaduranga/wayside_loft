"use client";
import dynamic from "next/dynamic";

const Map = dynamic((module) => import("../Map"), { ssr: false });

import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";

const initialCenter = [5.9495523492736515, 80.45819726671677];

function ContactMap() {
  const [center, setCenter] = useState([...initialCenter]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="relative w-full h-full min-h-[300px]">
      <Map initialCenter={initialCenter} center={center} />
    </div>
  );
}

export default ContactMap;

