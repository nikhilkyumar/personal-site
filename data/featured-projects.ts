export type FeaturedProject = {
  id: string;
  number: string;
  name: string;
  label: string;
  tagline: string;
  description: string;
  highlights: string[];
  stack: string[];
  className: string;
  metric?: string;
  metricLabel?: string;
};

export const featuredProjects: FeaturedProject[] = [
  {
    id: "greeneye",
    number: "01",
    name: "GreenEye",
    label: "AI · COMPUTER VISION",
    tagline: "A closer look at plant health.",
    description:
      "A computer-vision project exploring how image classification can help identify plant diseases across multiple crop datasets, connected to an app and inference pipeline.",
    highlights: [
      "CNN-based classification with 92% reported accuracy on the project datasets",
      "FastAPI inference with TensorFlow Lite for real-time use",
      "OpenCV image processing and MongoDB data management",
    ],
    stack: ["TensorFlow", "CNN", "FastAPI", "OpenCV", "TensorFlow Lite"],
    className: "greeneye",
    metric: "92%",
    metricLabel: "reported classification accuracy",
  },
  {
    id: "blogit",
    number: "02",
    name: "Blogit",
    label: "FULL STACK · BACKEND",
    tagline: "A solid foundation for publishing.",
    description:
      "A full-stack blogging platform focused on the fundamentals that make a content product work: authentication, authorization, structured APIs, validation, and predictable error handling.",
    highlights: [
      "10+ RESTful APIs for blog workflows",
      "MVC architecture with Node.js, Express, MongoDB and Mongoose",
      "Session handling, input validation, pagination and centralized errors",
    ],
    stack: ["Node.js", "Express", "MongoDB", "Mongoose", "EJS"],
    className: "blogit",
  },
  {
    id: "footypundit",
    number: "03",
    name: "FootyPundit",
    label: "DATA SCIENCE · SPORTS ANALYTICS",
    tagline: "Looking for value beyond the headline.",
    description:
      "A football analytics concept combining player performance, workload and transfer data to explore market value and injury risk, then bring the predictions together in a Player Investment Index.",
    highlights: [
      "XGBoost and LSTM approaches for value and injury-risk estimates",
      "A Player Investment Index (PII) to combine model outputs",
      "Power BI views for exploring potential scouting insights",
    ],
    stack: ["Python", "Pandas", "XGBoost", "LSTM", "SHAP", "Power BI"],
    className: "footypundit",
  },
];
