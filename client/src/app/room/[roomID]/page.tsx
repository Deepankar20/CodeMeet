"use client";
import VideoChat from "@/app/room/_components/VideoChat";
import CodeEditor from "@/app/room/_components/CodeEditor";
import { useSocket } from "@/hooks/SocketContext";
import { use, useEffect, useRef, useState } from "react";
import VideoPreview from "../_components/VideoPreview";
import { useMediaStream } from "@/hooks/useMediaStream";
import { usePeerConnection } from "@/hooks/usePeerConnection";
import { useRouter } from "next/navigation";

export default function Page({
  params,
}: {
  params: Promise<{ roomID: string }>;
}) {
  const { roomID } = use(params);
  const { socket } = useSocket();
  const [preview, setPreview] = useState<boolean>(true);

  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const router = useRouter();
  pcRef.current = usePeerConnection();

  const media = useMediaStream(localVideoRef, pcRef);

  useEffect(() => {
    if (!socket) return;

    if (!preview) {
      socket.emit("event:join", { roomID });
    }
  }, [socket, preview]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {preview ? (
        <div>
          <VideoPreview
            audio={media.audio}
            video={media.video}
            toggleAudio={media.toggleAudio}
            toggleVideo={media.toggleVideo}
            videoRef={localVideoRef}
            setPreview={setPreview}
          />
        </div>
      ) : (
        <div className="flex">
          <div></div>

          <div className="w-2/3 h-screen border-r-1 border-white p-2">
            <CodeEditor roomID={roomID} />
          </div>
          <div className="w-1/3 h-screen p-2">
            <VideoChat
              roomID={roomID}
              audio={media.audio}
              video={media.video}
              toggleAudio={media.toggleAudio}
              toggleVideo={media.toggleVideo}
              localVideoRef={localVideoRef}
              setStream={media.setStream}
              stream={media.stream}
              pcRef={pcRef}
            />
          </div>
        </div>
      )}
    </div>
  );
}
