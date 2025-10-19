import { render, screen } from "@testing-library/react";
import { VideoCard } from "@/components/cards/VideoCard";
import { Video } from "@/data/collective";

// Mock framer-motion to avoid animation issues in tests
jest.mock("framer-motion", () => ({
  motion: {
    div: ({
      children,
      whileHover,
      initial,
      animate,
      transition,
      ...props
    }: any) => <div {...props}>{children}</div>,
  },
}));

const mockVideo: Video = {
  id: "test-video-1",
  title: "Test Video Title",
  date: "2024-03-15",
  description: "This is a test video description for unit testing purposes.",
  youtubeId: "dQw4w9WgXcQ",
};

describe("VideoCard", () => {
  it("renders video title correctly", () => {
    render(<VideoCard video={mockVideo} />);
    expect(screen.getByText("Test Video Title")).toBeInTheDocument();
  });

  it("renders video description correctly", () => {
    render(<VideoCard video={mockVideo} />);
    expect(
      screen.getByText(
        "This is a test video description for unit testing purposes."
      )
    ).toBeInTheDocument();
  });

  it("renders formatted date correctly", () => {
    render(<VideoCard video={mockVideo} />);
    expect(screen.getByText("15 mars 2024")).toBeInTheDocument();
  });

  it("renders YouTube iframe with correct src", () => {
    render(<VideoCard video={mockVideo} />);
    const iframe = screen.getByTitle("Test Video Title");
    expect(iframe).toHaveAttribute(
      "src",
      "https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1"
    );
  });

  it("has proper accessibility attributes", () => {
    render(<VideoCard video={mockVideo} />);
    const iframe = screen.getByTitle("Test Video Title");
    expect(iframe).toHaveAttribute("allowFullScreen");
    expect(iframe).toHaveAttribute("loading", "lazy");
  });

  it("applies correct CSS classes for styling", () => {
    const { container } = render(<VideoCard video={mockVideo} />);
    const card = container.querySelector(".group");
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass("group");
  });
});
