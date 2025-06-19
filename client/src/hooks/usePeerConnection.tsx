import { useRef, useState } from "react";

export function usePeerConnection() {
  const pcRef = useRef<RTCPeerConnection | null>(null);
  if (!pcRef.current) {
    pcRef.current = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });
  }

  return pcRef.current;
}
