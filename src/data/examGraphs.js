const examGraphs = {
  motion_graphs: [
    {
      type: "graph-read",
      question: "Calculate the total distance travelled in the first 10 seconds",
      questionSubtitle: "Use the velocity-time graph below",
      graphType: "velocity-time",
      points: [
        { t: 0, v: 0 },
        { t: 4, v: 12 },
        { t: 10, v: 12 }
      ],
      xLabel: "Time (s)",
      yLabel: "Velocity (m/s)",
      taskType: "area",
      answer: 96,
      answerUnit: "m",
      steps: [
        "Area of triangle (0-4s) = \u00bd \u00d7 4 \u00d7 12 = 24 m",
        "Area of rectangle (4-10s) = 6 \u00d7 12 = 72 m",
        "Total distance = 24 + 72 = 96 m"
      ],
      commonMistake: "Don't use speed \u00d7 time for the acceleration phase \u2014 use \u00bd \u00d7 base \u00d7 height for the triangle",
      tier: 2,
      senNote: "Distance = area under the graph. Split it into a triangle and a rectangle."
    },
    {
      type: "graph-read",
      question: "Calculate the total distance travelled in the first 16 seconds",
      questionSubtitle: "Use the velocity-time graph below",
      graphType: "velocity-time",
      points: [
        { t: 0, v: 0 },
        { t: 4, v: 20 },
        { t: 10, v: 20 },
        { t: 16, v: 0 }
      ],
      xLabel: "Time (s)",
      yLabel: "Velocity (m/s)",
      taskType: "area",
      answer: 200,
      answerUnit: "m",
      steps: [
        "Area of triangle (0-4s) = \u00bd \u00d7 4 \u00d7 20 = 40 m",
        "Area of rectangle (4-10s) = 6 \u00d7 20 = 120 m",
        "Area of triangle (10-16s) = \u00bd \u00d7 6 \u00d7 20 = 60 m",
        "Total distance = 40 + 120 + 60 = 200 m"
      ],
      commonMistake: "The deceleration section is also a triangle \u2014 don't forget to use \u00bd \u00d7 base \u00d7 height",
      tier: 2,
      senNote: "Split the trapezium into two triangles and a rectangle, then add the areas."
    },
    {
      type: "graph-read",
      question: "Calculate the acceleration between 0 and 5 seconds",
      questionSubtitle: "Use the velocity-time graph below",
      graphType: "velocity-time",
      points: [
        { t: 0, v: 0 },
        { t: 5, v: 15 },
        { t: 12, v: 15 }
      ],
      xLabel: "Time (s)",
      yLabel: "Velocity (m/s)",
      taskType: "gradient",
      answer: 3,
      answerUnit: "m/s\u00b2",
      steps: [
        "Acceleration = change in velocity \u00f7 time taken",
        "Acceleration = (15 \u2212 0) \u00f7 (5 \u2212 0)",
        "Acceleration = 15 \u00f7 5 = 3 m/s\u00b2"
      ],
      commonMistake: "Acceleration is the gradient (slope) of a velocity-time graph, not the area under it",
      tier: 2,
      senNote: "Gradient = rise \u00f7 run = change in velocity \u00f7 change in time"
    }
  ],

  newtons_laws: [
    {
      type: "graph-read",
      question: "What is the velocity of the object at t = 6 seconds?",
      questionSubtitle: "Use the velocity-time graph below",
      graphType: "velocity-time",
      points: [
        { t: 0, v: 0 },
        { t: 4, v: 20 },
        { t: 8, v: 20 },
        { t: 12, v: 0 }
      ],
      xLabel: "Time (s)",
      yLabel: "Velocity (m/s)",
      taskType: "read-value",
      answer: 20,
      answerUnit: "m/s",
      steps: [
        "Find t = 6 s on the horizontal axis",
        "Read up to the line: between t = 4 s and t = 8 s the velocity is constant",
        "The velocity at t = 6 s is 20 m/s"
      ],
      commonMistake: "Make sure you read from the correct axis \u2014 time is on the x-axis, velocity on the y-axis",
      tier: 1,
      senNote: "Go across to 6 on the time axis, then read straight up to the line."
    },
    {
      type: "graph-read",
      question: "Calculate the deceleration when the brakes are applied between 8 and 12 seconds",
      questionSubtitle: "Use the velocity-time graph below",
      graphType: "velocity-time",
      points: [
        { t: 0, v: 24 },
        { t: 8, v: 24 },
        { t: 12, v: 0 }
      ],
      xLabel: "Time (s)",
      yLabel: "Velocity (m/s)",
      taskType: "gradient",
      answer: -6,
      answerUnit: "m/s\u00b2",
      steps: [
        "Deceleration = change in velocity \u00f7 time taken",
        "Change in velocity = 0 \u2212 24 = \u221224 m/s",
        "Time taken = 12 \u2212 8 = 4 s",
        "Deceleration = \u221224 \u00f7 4 = \u22126 m/s\u00b2"
      ],
      commonMistake: "Deceleration is negative acceleration \u2014 the answer should be negative because the object is slowing down",
      tier: 2,
      senNote: "The gradient is negative because the velocity is decreasing."
    },
    {
      type: "graph-read",
      question: "Calculate the distance the car travels during the acceleration phase (0 to 6 seconds)",
      questionSubtitle: "Use the velocity-time graph below",
      graphType: "velocity-time",
      points: [
        { t: 0, v: 0 },
        { t: 6, v: 18 },
        { t: 14, v: 18 }
      ],
      xLabel: "Time (s)",
      yLabel: "Velocity (m/s)",
      taskType: "area",
      answer: 54,
      answerUnit: "m",
      steps: [
        "The acceleration phase is from 0 to 6 seconds (a triangle)",
        "Area of triangle = \u00bd \u00d7 base \u00d7 height",
        "Area = \u00bd \u00d7 6 \u00d7 18 = 54 m"
      ],
      commonMistake: "Only calculate the area for the acceleration phase (0-6s), not the whole graph",
      tier: 2,
      senNote: "Distance during acceleration = area of the triangle = \u00bd \u00d7 base \u00d7 height"
    }
  ],

  terminal_velocity: [
    {
      type: "graph-read",
      question: "At what time does the skydiver reach terminal velocity?",
      questionSubtitle: "Use the velocity-time graph below",
      graphType: "velocity-time",
      points: [
        { t: 0, v: 0 },
        { t: 8, v: 50 },
        { t: 14, v: 50 },
        { t: 16, v: 15 },
        { t: 22, v: 15 }
      ],
      xLabel: "Time (s)",
      yLabel: "Velocity (m/s)",
      taskType: "read-value",
      answer: 8,
      answerUnit: "s",
      steps: [
        "Terminal velocity is where the graph becomes flat (constant velocity)",
        "The first flat section starts at t = 8 s",
        "Terminal velocity is reached at t = 8 s"
      ],
      commonMistake: "Terminal velocity is not the maximum speed — it is where the speed becomes constant (gradient = 0).",
      tier: 1,
      senNote: "Flat section = no acceleration = balanced forces = terminal velocity."
    },
    {
      type: "graph-read",
      question: "Calculate the acceleration of the skydiver in the first 8 seconds.",
      questionSubtitle: "Use the velocity-time graph below",
      graphType: "velocity-time",
      points: [
        { t: 0, v: 0 },
        { t: 8, v: 50 },
        { t: 14, v: 50 }
      ],
      xLabel: "Time (s)",
      yLabel: "Velocity (m/s)",
      taskType: "gradient",
      answer: 6.25,
      answerUnit: "m/s²",
      steps: [
        "Acceleration = gradient = change in velocity ÷ time taken",
        "Change in velocity = 50 - 0 = 50 m/s",
        "Time = 8 - 0 = 8 s",
        "Acceleration = 50 ÷ 8 = 6.25 m/s²"
      ],
      commonMistake: "Use only the sloping section (0–8 s) for acceleration. The flat section has zero acceleration.",
      tier: 2,
      senNote: "Gradient of a v-t graph = acceleration. Use change in v ÷ change in t."
    },
    {
      type: "graph-read",
      question: "A skydiver opens their parachute at t = 14 s. Describe what happens to the velocity between t = 14 s and t = 22 s.",
      questionSubtitle: "Use the velocity-time graph below",
      graphType: "velocity-time",
      points: [
        { t: 0, v: 0 },
        { t: 8, v: 50 },
        { t: 14, v: 50 },
        { t: 18, v: 15 },
        { t: 22, v: 15 }
      ],
      xLabel: "Time (s)",
      yLabel: "Velocity (m/s)",
      taskType: "describe",
      answer: 15,
      answerUnit: "m/s",
      steps: [
        "At t = 14 s, parachute opens → drag suddenly > weight → deceleration",
        "Velocity decreases from 50 m/s to 15 m/s",
        "At t = 18 s, new terminal velocity reached (15 m/s) — graph becomes flat again"
      ],
      commonMistake: "The skydiver slows down, not stops. A new lower terminal velocity is reached where drag again equals weight.",
      tier: 3,
      senNote: "Parachute increases drag → net upward force → deceleration → new terminal velocity."
    }
  ],

  half_life: [
    {
      type: "graph-read",
      question: "Use the decay graph to determine the half-life of the radioactive sample.",
      questionSubtitle: "The graph shows count rate against time.",
      graphType: "decay",
      points: [
        { t: 0, v: 800 },
        { t: 2, v: 400 },
        { t: 4, v: 200 },
        { t: 6, v: 100 },
        { t: 8, v: 50 }
      ],
      xLabel: "Time (hours)",
      yLabel: "Count rate (counts/min)",
      taskType: "read-value",
      answer: 2,
      answerUnit: "hours",
      steps: [
        "Find the initial count rate: 800 counts/min at t = 0",
        "Find when the count rate has halved: 400 counts/min",
        "Read the time at 400 counts/min from the graph: t = 2 hours",
        "Half-life = 2 hours"
      ],
      commonMistake: "Read from the initial value to HALF that value. Don't use the time when the count rate reaches zero.",
      tier: 2,
      senNote: "Half-life = time for count rate to halve. Start at the top and find when it drops to half."
    },
    {
      type: "graph-read",
      question: "A radioactive source has a count rate of 640 counts/min. After 6 hours the count rate is 80 counts/min. Calculate the half-life.",
      questionSubtitle: "Use the decay data provided.",
      graphType: "decay",
      points: [
        { t: 0, v: 640 },
        { t: 2, v: 320 },
        { t: 4, v: 160 },
        { t: 6, v: 80 }
      ],
      xLabel: "Time (hours)",
      yLabel: "Count rate (counts/min)",
      taskType: "read-value",
      answer: 2,
      answerUnit: "hours",
      steps: [
        "640 → 320: first half-life (2 hours)",
        "320 → 160: second half-life (2 hours)",
        "160 → 80: third half-life (2 hours)",
        "Three half-lives in 6 hours → half-life = 6 ÷ 3 = 2 hours"
      ],
      commonMistake: "Count how many times the count rate halved. Then divide the total time by the number of half-lives.",
      tier: 2,
      senNote: "Count the number of halvings. Half-life = total time ÷ number of halvings."
    },
    {
      type: "graph-read",
      question: "The half-life of iodine-131 is 8 days. A sample starts with count rate 1200 counts/min. What is the count rate after 24 days?",
      questionSubtitle: "Use the decay graph or calculate using half-lives.",
      graphType: "decay",
      points: [
        { t: 0, v: 1200 },
        { t: 8, v: 600 },
        { t: 16, v: 300 },
        { t: 24, v: 150 }
      ],
      xLabel: "Time (days)",
      yLabel: "Count rate (counts/min)",
      taskType: "read-value",
      answer: 150,
      answerUnit: "counts/min",
      steps: [
        "24 days ÷ 8 days = 3 half-lives",
        "After 1st half-life: 1200 ÷ 2 = 600",
        "After 2nd half-life: 600 ÷ 2 = 300",
        "After 3rd half-life: 300 ÷ 2 = 150 counts/min"
      ],
      commonMistake: "Halve the count rate once for each half-life. Do NOT just divide the original by the number of half-lives.",
      tier: 3,
      senNote: "Divide the time by the half-life to find the number of halvings. Halve the count rate that many times."
    }
  ],

  energy_resources: [
    {
      type: "graph-read",
      question: "A bar chart shows the efficiency of four power stations: coal 35%, gas 45%, nuclear 33%, wind 40%. Which power station has the highest efficiency?",
      questionSubtitle: "Read the bar chart values.",
      graphType: "bar",
      points: [
        { t: 1, v: 35 },
        { t: 2, v: 45 },
        { t: 3, v: 33 },
        { t: 4, v: 40 }
      ],
      xLabel: "Power station type",
      yLabel: "Efficiency (%)",
      taskType: "read-value",
      answer: 45,
      answerUnit: "%",
      steps: [
        "Read each bar: coal = 35%, gas = 45%, nuclear = 33%, wind = 40%",
        "Compare all values",
        "Gas has the highest efficiency at 45%"
      ],
      commonMistake: "Read from the top of each bar, not the middle. Compare all four values before answering.",
      tier: 1,
      senNote: "The tallest bar has the highest value. Read each bar carefully from the y-axis."
    },
    {
      type: "graph-read",
      question: "A bar chart shows annual energy output (TWh) from UK sources: gas 120, nuclear 65, wind 75, solar 15, other 25. What is the total energy output from low-carbon sources (nuclear, wind, solar)?",
      questionSubtitle: "Use the bar chart data.",
      graphType: "bar",
      points: [
        { t: 1, v: 120 },
        { t: 2, v: 65 },
        { t: 3, v: 75 },
        { t: 4, v: 15 },
        { t: 5, v: 25 }
      ],
      xLabel: "Energy source",
      yLabel: "Annual output (TWh)",
      taskType: "area",
      answer: 155,
      answerUnit: "TWh",
      steps: [
        "Low-carbon sources: nuclear (65) + wind (75) + solar (15)",
        "Total = 65 + 75 + 15 = 155 TWh"
      ],
      commonMistake: "Only add the low-carbon sources (nuclear, wind, solar). Do not include gas.",
      tier: 2,
      senNote: "Identify which sources are low-carbon, then add only those values from the chart."
    }
  ],

  stopping_distance: [
    {
      type: "graph-read",
      question: "Calculate the total stopping distance using the velocity-time graph",
      questionSubtitle: "Use the velocity-time graph below",
      graphType: "velocity-time",
      points: [
        { t: 0, v: 25 },
        { t: 3, v: 25 },
        { t: 8, v: 0 }
      ],
      xLabel: "Time (s)",
      yLabel: "Velocity (m/s)",
      taskType: "area",
      answer: 137.5,
      answerUnit: "m",
      steps: [
        "Thinking distance (0-3s) = rectangle area = 3 \u00d7 25 = 75 m",
        "Braking distance (3-8s) = triangle area = \u00bd \u00d7 5 \u00d7 25 = 62.5 m",
        "Total stopping distance = 75 + 62.5 = 137.5 m"
      ],
      commonMistake: "Remember stopping distance = thinking distance + braking distance. The constant speed section is the thinking distance.",
      tier: 2,
      senNote: "Constant speed = thinking distance (rectangle). Slowing down = braking distance (triangle)."
    },
    {
      type: "graph-read",
      question: "Calculate the deceleration during the braking phase",
      questionSubtitle: "Use the velocity-time graph below",
      graphType: "velocity-time",
      points: [
        { t: 0, v: 30 },
        { t: 2, v: 30 },
        { t: 8, v: 0 }
      ],
      xLabel: "Time (s)",
      yLabel: "Velocity (m/s)",
      taskType: "gradient",
      answer: -5,
      answerUnit: "m/s\u00b2",
      steps: [
        "The braking phase is from t = 2 s to t = 8 s",
        "Change in velocity = 0 \u2212 30 = \u221230 m/s",
        "Time taken = 8 \u2212 2 = 6 s",
        "Deceleration = \u221230 \u00f7 6 = \u22125 m/s\u00b2"
      ],
      commonMistake: "Use only the braking section (2-8s), not the whole graph. The thinking time section has zero acceleration.",
      tier: 2,
      senNote: "Only use the sloping part of the graph to find the deceleration."
    },
    {
      type: "graph-read",
      question: "At what time does the car come to a complete stop?",
      questionSubtitle: "Use the velocity-time graph below",
      graphType: "velocity-time",
      points: [
        { t: 0, v: 20 },
        { t: 4, v: 20 },
        { t: 10, v: 0 }
      ],
      xLabel: "Time (s)",
      yLabel: "Velocity (m/s)",
      taskType: "read-value",
      answer: 10,
      answerUnit: "s",
      steps: [
        "Find where the velocity reaches 0 m/s on the y-axis",
        "Read down to the time axis",
        "The car stops at t = 10 s"
      ],
      commonMistake: "The car starts braking at t = 4 s but does not stop until t = 10 s",
      tier: 1,
      senNote: "The car stops when velocity = 0. Find where the line meets the time axis."
    }
  ]
};

export default examGraphs;
