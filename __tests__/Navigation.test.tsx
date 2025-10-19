import { render, screen } from "@testing-library/react";
import { Navigation } from "@/components/layout/Navigation";

// Mock framer-motion
jest.mock("framer-motion", () => ({
  motion: {
    header: ({ children, ...props }: any) => (
      <header {...props}>{children}</header>
    ),
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => (
      <button {...props}>{children}</button>
    ),
  },
}));

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe("Navigation", () => {
  beforeEach(() => {
    // Mock window.scrollTo
    Object.defineProperty(window, "scrollTo", {
      value: jest.fn(),
      writable: true,
    });

    // Mock getElementById
    Object.defineProperty(document, "getElementById", {
      value: jest.fn(() => ({
        offsetTop: 100,
        offsetHeight: 500,
      })),
      writable: true,
    });
  });

  it("renders navigation with collective name", () => {
    render(<Navigation />);
    expect(screen.getByText("Urban Roots Collective")).toBeInTheDocument();
  });

  it("renders all navigation items", () => {
    render(<Navigation />);
    expect(screen.getByText("Accueil")).toBeInTheDocument();
    expect(screen.getByText("Membres")).toBeInTheDocument();
    expect(screen.getByText("Vidéos")).toBeInTheDocument();
    expect(screen.getByText("Galerie")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  it("renders logo with correct initials", () => {
    render(<Navigation />);
    expect(screen.getByText("URC")).toBeInTheDocument();
  });
});
