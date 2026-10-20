import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Nikhil Kumar — Personal Website",
    short_name: "Nikhil Kumar",
    description: "Projects, experiments, and things I'm learning.",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f5ef",
    theme_color: "#f7f5ef",
  };
}
