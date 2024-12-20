import React from 'react';
import Timer from '@/components/Timer';
import WorkoutHistory from '@/components/WorkoutHistory';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">健身组间歇训练</h1>
          <p className="text-gray-500">设置你的训练时间，开始锻炼吧</p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2">
          <div className="flex justify-center">
            <Timer onComplete={() => console.log('训练完成')} />
          </div>
          <div className="flex justify-center">
            <WorkoutHistory />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;