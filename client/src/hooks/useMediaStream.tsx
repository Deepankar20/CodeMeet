"use client";
import { useEffect, useState } from "react";

export function useMediaStream(
  localVideoRef: React.RefObject<HTMLVideoElement | null>,
  pcRef: React.RefObject<RTCPeerConnection | null>
) {
  const [stream, setStream] = useState<MediaStream | null>(null);

  const toggleAudio = () => {
    if (stream) {
      stream.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setAudio(!audio);
    }
  };

  const toggleVideo = () => {
    if (stream) {
      stream.getVideoTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setVideo(!video);
    }
  };

  const [video, setVideo] = useState<boolean>(true);
  const [audio, setAudio] = useState<boolean>(true);

  useEffect(() => {
    const enableMedia = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: video,
          audio: audio,
        });

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = mediaStream;
        }

        setStream(mediaStream);

        // Add tracks to the RTCPeerConnection
        if (pcRef.current) {
          mediaStream.getTracks().forEach((track) => {
            pcRef.current?.addTrack(track, mediaStream);
          });
        }
      } catch (error) {
        console.error("Error accessing media devices:", error);
      }
    };

    enableMedia();

    // Cleanup
    return () => {
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, [localVideoRef, pcRef]);

  return { stream, toggleAudio, toggleVideo, video, audio, setStream };
}
