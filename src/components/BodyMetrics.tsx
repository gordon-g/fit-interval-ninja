import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";

interface FoodEntry {
  id: number;
  name: string;
  calories: number;
  time: string;
}

const BodyMetrics = () => {
  const { toast } = useToast();
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState('male');
  const [bodyFat, setBodyFat] = useState('');
  const [age, setAge] = useState('');
  const [foodEntries, setFoodEntries] = useState<FoodEntry[]>([]);
  const [newFood, setNewFood] = useState('');
  const [calories, setCalories] = useState('');

  // 计算基础代谢率 (BMR)
  const calculateBMR = () => {
    if (!weight || !height || !age) {
      toast({
        title: "请填写完整信息",
        description: "需要体重、身高和年龄来计算基础代谢率",
      });
      return;
    }

    let bmr;
    if (gender === 'male') {
      bmr = 66 + (13.7 * parseFloat(weight)) + (5 * parseFloat(height)) - (6.8 * parseFloat(age));
    } else {
      bmr = 655 + (9.6 * parseFloat(weight)) + (1.8 * parseFloat(height)) - (4.7 * parseFloat(age));
    }

    toast({
      title: "基础代谢率 (BMR)",
      description: `您的每日基础代谢率约为 ${Math.round(bmr)} 卡路里`,
    });
  };

  const addFoodEntry = () => {
    if (!newFood || !calories) {
      toast({
        title: "请填写完整信息",
        description: "需要食物名称和估算卡路里",
      });
      return;
    }

    const entry: FoodEntry = {
      id: Date.now(),
      name: newFood,
      calories: parseFloat(calories),
      time: new Date().toLocaleTimeString(),
    };

    setFoodEntries([...foodEntries, entry]);
    setNewFood('');
    setCalories('');

    toast({
      title: "添加成功",
      description: "已记录饮食信息",
    });
  };

  return (
    <Card className="w-full max-w-md p-6 space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">身体数据</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="height">身高 (cm)</Label>
            <Input
              id="height"
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="170"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="weight">体重 (kg)</Label>
            <Input
              id="weight"
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="65"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="age">年龄</Label>
            <Input
              id="age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="25"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bodyFat">体脂率 (%)</Label>
            <Input
              id="bodyFat"
              type="number"
              value={bodyFat}
              onChange={(e) => setBodyFat(e.target.value)}
              placeholder="20"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="gender">性别</Label>
            <Select value={gender} onValueChange={setGender}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">男</SelectItem>
                <SelectItem value="female">女</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button onClick={calculateBMR} className="w-full mt-4">
          计算基础代谢率
        </Button>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">今日饮食记录</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="foodName">食物名称</Label>
            <Input
              id="foodName"
              value={newFood}
              onChange={(e) => setNewFood(e.target.value)}
              placeholder="例：鸡胸肉"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="calories">估算卡路里</Label>
            <Input
              id="calories"
              type="number"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              placeholder="200"
            />
          </div>
        </div>
        <Button onClick={addFoodEntry} className="w-full">
          添加饮食记录
        </Button>

        <ScrollArea className="h-[200px] w-full rounded-md border p-4">
          <div className="space-y-2">
            {foodEntries.map((entry) => (
              <div
                key={entry.id}
                className="flex justify-between items-center p-2 bg-secondary rounded-lg"
              >
                <div>
                  <span className="font-medium">{entry.name}</span>
                  <span className="text-sm text-muted-foreground ml-2">
                    {entry.time}
                  </span>
                </div>
                <span className="text-sm">{entry.calories} 卡路里</span>
              </div>
            ))}
          </div>
        </ScrollArea>
        
        {foodEntries.length > 0 && (
          <div className="text-right text-sm text-muted-foreground">
            总卡路里: {foodEntries.reduce((sum, entry) => sum + entry.calories, 0)}
          </div>
        )}
      </div>
    </Card>
  );
};

export default BodyMetrics;