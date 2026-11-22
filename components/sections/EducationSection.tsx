import { Medals } from "@/components/motion/Medals";
import { EDUCATION } from "@/constants/portfolio";

export function EducationSection() {
  return (
    <section id="education" className="education">
      {EDUCATION.map((course) => (
        <article className="course" key={course.id}>
          {course.achievements && <Medals achievements={course.achievements} />}
          <div className="course-copy" data-motion="left">
            <h2 className="heading">{course.degree}</h2>
            <p>
              {course.institution}, {course.year}
            </p>
          </div>
        </article>
      ))}
    </section>
  );
}
