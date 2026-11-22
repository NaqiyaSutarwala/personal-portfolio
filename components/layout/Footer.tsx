import { PERSONAL_INFO } from "@/constants/portfolio";

export function Footer() {
  return (
    <footer className="footer">
      <p>
        © {new Date().getFullYear()} {PERSONAL_INFO.name}
      </p>
      <a href="#about">Back to the top</a>
    </footer>
  );
}
