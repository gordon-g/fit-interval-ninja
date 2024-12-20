import React from 'react';
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dumbbell, Activity, Heart, Brain } from "lucide-react";

interface Exercise {
  id: number;
  name: string;
  muscleGroup: string;
  icon: React.ReactNode;
}

const exercises: Exercise[] = [
  {
    id: 1,
    name: '俯卧撑',
    muscleGroup: '胸部/三头肌',
    icon: <Dumbbell className="w-6 h-6" />,
  },
  {
    id: 2,
    name: '深蹲',
    muscleGroup: '腿部',
    icon: <Activity className="w-6 h-6" />,
  },
  {
    id: 3,
    name: '平板支撑',
    muscleGroup: '核心',
    icon: <Heart className="w-6 h-6" />,
  },
  {
    id: 4,
    name: '瑜伽',
    muscleGroup: '全身/放松',
    icon: <Brain className="w-6 h-6" />,
  },
];

interface ExerciseSelectorProps {
  onSelect: (exercise: Exercise) => void;
  selectedId?: number;
}

const ExerciseSelector: React.FC<ExerciseSelectorProps> = ({ onSelect, selectedId }) => {
  return (
    <Card className="w-full max-w-md p-6 animate-slide-up">
      <h2 className="text-xl font-semibold mb-4">选择训练动作</h2>
      <ScrollArea className="h-[200px]">
        <div className="space-y-2">
          {exercises.map((exercise) => (
            <div
              key={exercise.id}
              onClick={() => onSelect(exercise)}
              className={`p-4 rounded-lg cursor-pointer transition-colors flex items-center space-x-3 ${
                selectedId === exercise.id
                  ? 'bg-primary text-white'
                  : 'hover:bg-gray-100'
              }`}
            >
              <div className="flex-shrink-0">{exercise.icon}</div>
              <div>
                <h3 className="font-medium">{exercise.name}</h3>
                <p className="text-sm opacity-80">{exercise.muscleGroup}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};

export default ExerciseSelector;