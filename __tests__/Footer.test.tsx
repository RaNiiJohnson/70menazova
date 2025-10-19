import { render, screen } from "@testing-library/react";
import { Footer } from "@/components/layout/Footer";

// Mock framer-motion
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    a: ({ children, ...props }: any) => <a {...props}>{children}</a>,
    button: ({ children, ...props }: any) => (
      <button {...props}>{children}</button>
    ),
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
  },
}));

describe("Footer", () => {
  it("renders collective name and tagline", () => {
    render(<Footer />);
    expect(screen.getByText("Urban Roots Collective")).toBeInTheDocument();
    expect(
      screen.getByText("L'authenticité malgache dans le rap urbain")
    ).toBeInTheDocument();
  });

  it("renders contact information", () => {
    render(<Footer />);
    expect(screen.getByText("Contact")).toBeInTheDocument();
    expect(
      screen.getByText("contact@urbanrootscollective.mg")
    ).toBeInTheDocument();
    expect(screen.getByText("+261 34 12 345 67")).toBeInTheDocument();
    expect(screen.getByText("Antananarivo, Madagascar")).toBeInTheDocument();
  });

  it("renders social links section", () => {
    render(<Footer />);
    expect(screen.getByText("Suivez-nous")).toBeInTheDocument();
  });

  it("renders copyright information", () => {
    const currentYear = new Date().getFullYear();
    render(<Footer />);
    expect(
      screen.getByText(
        `© ${currentYear} Urban Roots Collective. Tous droits réservés.`
      )
    ).toBeInTheDocument();
  });

  it("renders logo with correct initials", () => {
    render(<Footer />);
    expect(screen.getByText("URC")).toBeInTheDocument();
  });
});
