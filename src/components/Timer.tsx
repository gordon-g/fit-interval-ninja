import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Play, Pause, RotateCcw } from "lucide-react";

interface TimerProps {
  onComplete?: () => void;
}

const Timer: React.FC<TimerProps> = ({ onComplete }) => {
  const [workTime, setWorkTime] = useState(30);
  const [restTime, setRestTime] = useState(10);
  const [rounds, setRounds] = useState(3);
  const [currentRound, setCurrentRound] = useState(1);
  const [isWorking, setIsWorking] = useState(true);
  const [timeLeft, setTimeLeft] = useState(workTime);
  const [isActive, setIsActive] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      if (isWorking) {
        toast({
          title: "休息时间!",
          description: `第 ${currentRound} 组完成`,
        });
        setIsWorking(false);
        setTimeLeft(restTime);
      } else {
        if (currentRound < rounds) {
          toast({
            title: "开始下一组!",
            description: `准备开始第 ${currentRound + 1} 组`,
          });
          setCurrentRound((round) => round + 1);
          setIsWorking(true);
          setTimeLeft(workTime);
        } else {
          toast({
            title: "训练完成!",
            description: "恭喜你完成了所有训练",
          });
          resetTimer();
          onComplete?.();
        }
      }
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, isWorking, currentRound, rounds, workTime, restTime]);

  const resetTimer = () => {
    setIsActive(false);
    setIsWorking(true);
    setCurrentRound(1);
    setTimeLeft(workTime);
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="w-full max-w-md p-6 space-y-6 animate-slide-up">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="workTime">训练时间 (秒)</Label>
            <Input
              id="workTime"
              type="number"
              value={workTime}
              onChange={(e) => setWorkTime(Number(e.target.value))}
              disabled={isActive}
              min={1}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="restTime">休息时间 (秒)</Label>
            <Input
              id="restTime"
              type="number"
              value={restTime}
              onChange={(e) => setRestTime(Number(e.target.value))}
              disabled={isActive}
              min={1}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="rounds">组数</Label>
          <Input
            id="rounds"
            type="number"
            value={rounds}
            onChange={(e) => setRounds(Number(e.target.value))}
            disabled={isActive}
            min={1}
          />
        </div>
      </div>

      <div className="text-center space-y-4">
        <div className="text-4xl font-bold text-primary">
          {formatTime(timeLeft)}
        </div>
        <div className="text-sm text-gray-500">
          第 {currentRound}/{rounds} 组 - {isWorking ? "训练中" : "休息中"}
        </div>
      </div>

      <div className="flex justify-center space-x-4">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleTimer}
          className="w-12 h-12 rounded-full"
        >
          {isActive ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={resetTimer}
          className="w-12 h-12 rounded-full"
        >
          <RotateCcw className="h-6 w-6" />
        </Button>
      </div>
    </Card>
  );
};

export default Timer;