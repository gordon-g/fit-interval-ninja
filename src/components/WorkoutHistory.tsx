import React from 'react';
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface WorkoutRecord {
  id: number;
  date: string;
  workTime: number;
  restTime: number;
  rounds: number;
  completed: boolean;
}

const WorkoutHistory: React.FC = () => {
  // 模拟训练记录数据
  const records: WorkoutRecord[] = [
    {
      id: 1,
      date: '2024-03-20',
      workTime: 30,
      restTime: 10,
      rounds: 3,
      completed: true,
    },
    {
      id: 2,
      date: '2024-03-19',
      workTime: 45,
      restTime: 15,
      rounds: 4,
      completed: false,
    },
  ];

  return (
    <Card className="w-full max-w-md p-6 animate-slide-up">
      <h2 className="text-xl font-semibold mb-4">训练记录</h2>
      <ScrollArea className="h-[300px] w-full">
        <div className="space-y-4">
          {records.map((record) => (
            <Card key={record.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{record.date}</p>
                  <p className="text-sm text-gray-500">
                    {record.workTime}秒训练 / {record.restTime}秒休息
                  </p>
                  <p className="text-sm text-gray-500">
                    {record.rounds} 组
                  </p>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm ${
                  record.completed
                    ? 'bg-success text-success-foreground'
                    : 'bg-secondary text-secondary-foreground'
                }`}>
                  {record.completed ? '已完成' : '未完成'}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};

export default WorkoutHistory;