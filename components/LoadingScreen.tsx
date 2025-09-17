import { Loader2 } from "lucide-react";

interface LoadingScreenProps {
  message: string;
}

export default function LoadingScreen({ message }: LoadingScreenProps) {
  return (
    <div className=" flex justify-center items-center h-screen w-full flex-col ">
      <div className=" backdrop-blur-sm bg-white/30 p-6 rounded-lg space-y-2">
        <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
        <p>{message}</p>
      </div>
    </div>
  );
}
