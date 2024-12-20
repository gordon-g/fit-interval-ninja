import React, { useState } from 'react';
import Timer from '@/components/Timer';
import WorkoutHistory from '@/components/WorkoutHistory';
import ExerciseSelector from '@/components/ExerciseSelector';
import WorkoutPlanner from '@/components/WorkoutPlanner';
import BodyMetrics from '@/components/BodyMetrics';

const Index = () => {
  const [selectedExerciseId, setSelectedExerciseId] = useState<number>();

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">健身组间歇训练</h1>
          <p className="text-gray-500">选择训练动作，设置时间，开始锻炼吧</p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-8 md:col-span-2">
            <ExerciseSelector
              onSelect={(exercise) => setSelectedExerciseId(exercise.id)}
              selectedId={selectedExerciseId}
            />
            <Timer onComplete={() => console.log('训练完成')} />
            <BodyMetrics />
          </div>
          <div className="space-y-8">
            <WorkoutPlanner />
            <WorkoutHistory />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;