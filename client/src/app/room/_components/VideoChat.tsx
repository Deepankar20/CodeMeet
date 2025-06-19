"use client";
import { useSocket } from "@/hooks/SocketContext";
import { useMediaStream } from "@/hooks/useMediaStream";
import { usePeerConnection } from "@/hooks/usePeerConnection";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

export default function VideoChat({
  roomID,
  toggleAudio,
  toggleVideo,
  audio,
  video,
  setStream,
  localVideoRef,
  stream,
  pcRef,
}: {
  roomID: string;
  localVideoRef: React.RefObject<HTMLVideoElement | null>;
  toggleAudio: () => void;
  toggleVideo: () => void;
  audio: boolean;
  video: boolean;
  setStream: Dispatch<SetStateAction<MediaStream | null>>;
  stream: MediaStream | null;
  pcRef: React.RefObject<RTCPeerConnection | null>;
}) {
  const { socket } = useSocket();
  const router = useRouter();

  const remoteVideoRef = useRef<HTMLVideoElement>(null);


  useEffect(() => {
    if (!socket || !pcRef.current) return;

    const pc = pcRef.current;

    pc.ontrack = (event) => {
      console.log("pc.ontrack");

      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };

    pc.onicecandidate = (event) => {
      console.log("pc.onice");

      if (event.candidate) {
        socket.emit("event:ice-candidate", {
          roomID,
          candidate: event.candidate,
        });
      }
    };

    socket.on("event:offer:reply", async (offer) => {
      await pc.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      socket.emit("event:answer", { roomID, answer });
    });

    socket.on("event:answer:reply", async (answer) => {
      await pc.setRemoteDescription(new RTCSessionDescription(answer));
    });

    socket.on("event:ice-candidate:reply", async (candidate) => {
      console.log("pc.ontrack>reply");

      try {
        await pc.addIceCandidate(new RTCIceCandidate(candidate));
      } catch (e) {
        console.error("Error adding ICE candidate", e);
      }
    });

    // socket.emit("event:join", { roomID });

    socket.on("event:start:call", () => {
      setTimeout(() => {
        callPeer();
      }, 2000);
    });

    socket.on("event:end:call:reply", () => {
      if (pcRef.current) {
        pcRef.current.close();
        pcRef.current = null;
      }

      // Stop media tracks and release camera
      if (localVideoRef.current) {
        const stream = localVideoRef.current.srcObject as MediaStream | null;

        if (stream) {
          stream.getTracks().forEach((track) => {
            track.stop(); // ⛔ This is what turns off the camera/mic
          });

          localVideoRef.current.srcObject = null;
        }
      }

      // Clear any global references to the stream if you store it in state
      setStream(null); // ✅ if you're using a useState for stream

      // Hard reload to guarantee cleanup in all browsers (especially mobile/Chrome)
      setTimeout(() => {
        window.location.href = "/"; // hard navigate instead of router.push
      }, 200);
    });

    // Cleanup
    return () => {
      socket.off("event:offer:reply");
      socket.off("event:answer:reply");
      socket.off("event:ice-candidate:reply");
    };
  }, [socket]);

  const callPeer = async () => {
    if (pcRef.current && socket) {
      const offer = await pcRef.current.createOffer();
      await pcRef.current.setLocalDescription(offer);
      socket.emit("event:offer", { roomID, offer });
    }
  };

  function endCall() {
    if (socket) {
      socket.emit("event:end:call", { roomID });
    }

    // Close peer connection
    if (pcRef.current) {
      pcRef.current.close();
      pcRef.current = null;
    }

    // Stop media tracks and release camera
    if (localVideoRef.current) {
      const stream = localVideoRef.current.srcObject as MediaStream | null;

      if (stream) {
        stream.getTracks().forEach((track) => {
          track.stop(); // ⛔ This is what turns off the camera/mic
        });

        localVideoRef.current.srcObject = null;
      }
    }

    // Clear any global references to the stream if you store it in state
    setStream(null); // ✅ if you're using a useState for stream

    // Hard reload to guarantee cleanup in all browsers (especially mobile/Chrome)
    setTimeout(() => {
      window.location.href = "/"; // hard navigate instead of router.push
    }, 200);
  }

  useEffect(() => {
    if (localVideoRef.current && stream) {
      localVideoRef.current.srcObject = stream;
    }
  }, [stream, localVideoRef]);

  return (
    <div className="flex flex-col items-center gap-4">
      <video ref={remoteVideoRef} autoPlay className="w-80 rounded" />
      <video ref={localVideoRef} autoPlay muted className="w-80 rounded" />

      {/* <button
        onClick={callPeer}
        className="bg-blue-600 px-4 py-2 text-white rounded"
      >
        Call
      </button> */}

      <div className="flex gap-6">
        <button
          onClick={toggleVideo}
          className="bg-red-600 px-4 py-2 text-white rounded cursor-pointer"
        >
          {video ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M12 18.75H4.5a2.25 2.25 0 0 1-2.25-2.25V9m12.841 9.091L16.5 19.5m-1.409-1.409c.407-.407.659-.97.659-1.591v-9a2.25 2.25 0 0 0-2.25-2.25h-9c-.621 0-1.184.252-1.591.659m12.182 12.182L2.909 5.909M1.5 4.5l1.409 1.409"
              />
            </svg>
          )}
        </button>
        <button
          onClick={toggleAudio}
          className="bg-red-600 px-4 py-2 text-white rounded cursor-pointer"
        >
          {audio ? (
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9v3a5.006 5.006 0 0 1-5 5h-4a5.006 5.006 0 0 1-5-5V9m7 9v3m-3 0h6M11 3h2a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3h-2a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3Z"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M19.97 9.012a1 1 0 1 0-2 0h2Zm-1 2.988 1 .001V12h-1Zm-8.962 4.98-.001 1h.001v-1Zm-3.52-1.46.708-.708-.707.707ZM5.029 12h-1v.001l1-.001Zm3.984 7.963a1 1 0 1 0 0 2v-2Zm5.975 2a1 1 0 0 0 0-2v2ZM7.017 8.017a1 1 0 1 0 2 0h-2Zm6.641 4.862a1 1 0 1 0 .667 1.886l-.667-1.886Zm-7.63-2.87a1 1 0 1 0-2 0h2Zm9.953 5.435a1 1 0 1 0 1 1.731l-1-1.731ZM12 16.979h1a1 1 0 0 0-1-1v1ZM5.736 4.322a1 1 0 0 0-1.414 1.414l1.414-1.414Zm12.528 15.356a1 1 0 0 0 1.414-1.414l-1.414 1.414ZM17.97 9.012V12h2V9.012h-2Zm0 2.987a3.985 3.985 0 0 1-1.168 2.813l1.415 1.414a5.985 5.985 0 0 0 1.753-4.225l-2-.002Zm-7.962 3.98a3.985 3.985 0 0 1-2.813-1.167l-1.414 1.414a5.985 5.985 0 0 0 4.225 1.753l.002-2Zm-2.813-1.167a3.985 3.985 0 0 1-1.167-2.813l-2 .002a5.985 5.985 0 0 0 1.753 4.225l1.414-1.414Zm3.808-10.775h1.992v-2h-1.992v2Zm1.992 0c1.097 0 1.987.89 1.987 1.988h2a3.988 3.988 0 0 0-3.987-3.988v2Zm1.987 1.988v4.98h2v-4.98h-2Zm-5.967 0c0-1.098.89-1.988 1.988-1.988v-2a3.988 3.988 0 0 0-3.988 3.988h2Zm-.004 15.938H12v-2H9.012v2Zm2.988 0h2.987v-2H12v2ZM9.016 8.017V6.025h-2v1.992h2Zm5.967 2.987a1.99 1.99 0 0 1-1.325 1.875l.667 1.886a3.989 3.989 0 0 0 2.658-3.76h-2ZM6.03 12v-1.992h-2V12h2Zm10.774 2.812a3.92 3.92 0 0 1-.823.632l1.002 1.731a5.982 5.982 0 0 0 1.236-.949l-1.415-1.414ZM4.322 5.736l13.942 13.942 1.414-1.414L5.736 4.322 4.322 5.736ZM12 15.98h-1.992v2H12v-2Zm-1 1v3.984h2V16.98h-2Z"
              />
            </svg>
          )}
        </button>

        <button
          onClick={endCall}
          className="bg-red-600 px-4 py-2 text-white rounded"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 3.75 18 6m0 0 2.25 2.25M18 6l2.25-2.25M18 6l-2.25 2.25m1.5 13.5c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 0 1 4.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 0 0-.38 1.21 12.035 12.035 0 0 0 7.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 0 1 1.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 0 1-2.25 2.25h-2.25Z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
