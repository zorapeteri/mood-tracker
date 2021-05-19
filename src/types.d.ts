const moodOptions = [1, 2, 3, 4, 5] as const;

type Mood = typeof moodOptions[number];
