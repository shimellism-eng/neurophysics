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
