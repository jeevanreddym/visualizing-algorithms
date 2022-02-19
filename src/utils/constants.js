

export const dirs = [
    [-1, 0], // up,
    [0, 1], // rt.
    [1, 0], // down,
    [0, -1] // left
];


export const SpeedOption = {
    SLOW: 'slow',
    MEDIUM: 'medium',
    FAST: 'fast',
};

export const speeds = [
    {speed: SpeedOption.SLOW, text: 'Slow', timeInMillis: 1000},
    {speed: SpeedOption.MEDIUM, text: 'Medium', timeInMillis: 100},
    {speed: SpeedOption.FAST, text: 'Fast', timeInMillis: 1},
];
