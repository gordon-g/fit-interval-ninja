import React from 'react';
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

interface WorkoutPlan {
  id: number;
  date: Date;
  exercises: {
    name: string;
    sets: number;
    completed: boolean;
  }[];
}

const WorkoutPlanner: React.FC = () => {
  const [date, setDate] = React.useState<Date>(new Date());
  
  // 示例数据
  const weeklyPlan: WorkoutPlan[] = [
    {
      id: 1,
      date: new Date(),
      exercises: [
        { name: '俯卧撑', sets: 3, completed: false },
        { name: '深蹲', sets: 4, completed: true },
      ],
    },
    {
      id: 2,
      date: new Date(Date.now() + 86400000), // 明天
      exercises: [
        { name: '平板支撑', sets: 3, completed: false },
        { name: '瑜伽', sets: 1, completed: false },
      ],
    },
  ];

  return (
    <Card className="w-full max-w-md p-6 animate-slide-up">
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">训练计划</h2>
          <Calendar
            mode="single"
            selected={date}
            onSelect={(date) => date && setDate(date)}
            className="rounded-md border"
          />
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-3">今日计划</h3>
          <ScrollArea className="h-[200px]">
            <div className="space-y-3">
              {weeklyPlan.map((plan) => (
                <div
                  key={plan.id}
                  className={cn(
                    "p-4 rounded-lg border",
                    new Date(plan.date).toDateString() === new Date(date).toDateString()
                      ? "border-primary"
                      : "border-gray-200"
                  )}
                >
                  <div className="text-sm text-gray-500 mb-2">
                    {new Date(plan.date).toLocaleDateString()}
                  </div>
                  {plan.exercises.map((exercise, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-1"
                    >
                      <span className="flex items-center">
                        <span className={cn(
                          "w-2 h-2 rounded-full mr-2",
                          exercise.completed ? "bg-green-500" : "bg-gray-300"
                        )} />
                        {exercise.name}
                      </span>
                      <span className="text-sm text-gray-500">
                        {exercise.sets} 组
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </Card>
  );
};

export default WorkoutPlanner;