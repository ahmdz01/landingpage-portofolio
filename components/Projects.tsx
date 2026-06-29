import { getGithubRepos, Repo } from "@/lib/github";
import ProjectsClient from "./ProjectsClient";

export default async function Projects() {
  const repos = await getGithubRepos("ahmdz01"); // ganti username GitHub kamu
  return <ProjectsClient repos={repos} />;
}