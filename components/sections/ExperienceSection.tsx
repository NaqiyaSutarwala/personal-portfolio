import { ProgressRail } from "@/components/motion/ProgressRail";
import { EXPERIENCES, STATS } from "@/constants/portfolio";
import { formatDateRange } from "@/lib/utils";

export function ExperienceSection() {
  return (
    <section id="experience" className="experience">
      <div className="experience-intro">
        <h2 className="heading" data-motion="left">Where I’ve worked</h2>
        <dl className="facts">
          {STATS.map((stat) => (
            <div key={stat.label} data-motion="right">
              <dt>{stat.label}</dt>
              <dd>
                {stat.number}
                {stat.suffix}
              </dd>
            </div>
          ))}
        </dl>
      </div>
      <ProgressRail>
        {EXPERIENCES.map((job) => (
          <article className={job.isCurrent ? "job job-current" : "job"} key={job.id}>
            <p className="job-date">{formatDateRange(job.startDate, job.endDate, job.isCurrent)}</p>
            <h3 data-motion="right">{job.company}</h3>
            <p className="job-role">
              {job.role}, {job.location}
            </p>
            {job.highlights && (
              <ul className="job-highlights">
                {job.highlights.map((highlight) => (
                  <li key={highlight} data-motion="right">{highlight}</li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </ProgressRail>
    </section>
  );
}
