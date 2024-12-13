import { disconnectUserFromRace } from "@/app/actions/disconnect-user-from-race";
import { useTypingFieldStore } from "@/hooks/zustand/use-typing-field";
import { getUser } from "@/server/queries";
import { createClient, RealtimeChannel } from "@supabase/supabase-js";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export function useHandleUserProgress(text: string, userId: string, raceId: string) {
  const { userWords } = useTypingFieldStore();

  const channel = useRef<RealtimeChannel | null>(null);
  const [channelSubscribed, setChannelSubscribed] = useState(false);

  // subscribe on mount
  useEffect(() => {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );

    // subscribe to this race's channel
    channel.current = supabase.channel(`race-${raceId}`, {
      config: {
        broadcast: { self: true },
      },
    });

    // subscribe to channel
    channel.current.subscribe((status) => {
      if (status === "SUBSCRIBED" && !channelSubscribed) {
        setChannelSubscribed(true);
      }
    });

    return () => {
      if (!channel.current) return;

      supabase.removeChannel(channel.current);
    };
  }, [userId, raceId]);

  // send progress payload every time userWords change (user types)
  useEffect(() => {
    if (!channelSubscribed || !channel.current) return;

    const totalChars = text.replace(/\s+/g, "").length;
    const userChars = userWords.join("").length;
    const userProgress = (userChars / totalChars) * 100;

    channel.current
      .send({
        type: "broadcast",
        event: `user-progress-update`,
        payload: {
          userId,
          progress: userProgress,
        },
      })
      .catch((error) => toast.error("Error sending progress update:", error));
  }, [userWords, channelSubscribed, userId]);
}
