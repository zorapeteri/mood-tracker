const moodOptions = [1, 2, 3, 4, 5] as const;

type Mood = typeof moodOptions[number];

type UserPreferences = {
  name: string;
  startsOnSunday: boolean;
};

type MoodLog = {
  id: string;
  time: Date;
  mood: Mood;
};

type Note = {
  id: string;
  date: Date;
  time: Date;
  text: string;
};