import type { Project } from '../data/projects';

type Props = {
  project: Project;
};

export default function ProjectCard({ project }: Props) {
  return (
    <article className="project-card">
      <div>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
      </div>
      <div className="project-footer">
        <div className="project-tags">
          {project.tags.map((tag) => (
            <span key={tag} className="project-tag">{tag}</span>
          ))}
        </div>
        <a className="project-link" href={project.link} target="_blank" rel="noreferrer">
          View
        </a>
      </div>
    </article>
  );
}
