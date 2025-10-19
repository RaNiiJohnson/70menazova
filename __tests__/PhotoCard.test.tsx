import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { PhotoCard } from "@/components/cards/PhotoCard";
import { Photo } from "@/data/collective";

// Mock framer-motion to avoid animation issues in tests
jest.mock("framer-motion", () => ({
  motion: {
    div: ({
      children,
      whileHover,
      initial,
      animate,
      transition,
      onClick,
      ...props
    }: any) => (
      <div onClick={onClick} {...props}>
        {children}
      </div>
    ),
  },
}));

// Mock Next.js Image component
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt, onLoad, onError, ...props }: any) => {
    // Simulate successful image load
    setTimeout(() => {
      if (onLoad) onLoad();
    }, 0);

    return <img src={src} alt={alt} {...props} />;
  },
}));

const mockPhoto: Photo = {
  id: "test-photo-1",
  src: "/images/gallery/test-photo.jpg",
  alt: "Test photo description",
  caption: "This is a test photo caption for the gallery",
};

const mockPhotoWithoutCaption: Photo = {
  id: "test-photo-2",
  src: "/images/gallery/test-photo-2.jpg",
  alt: "Test photo without caption",
};

const mockOnClick = jest.fn();

describe("PhotoCard", () => {
  beforeEach(() => {
    mockOnClick.mockClear();
  });

  it("renders photo with correct attributes", async () => {
    render(<PhotoCard photo={mockPhoto} onClick={mockOnClick} />);

    await waitFor(() => {
      const image = screen.getByAltText("Test photo description");
      expect(image).toHaveAttribute("src", "/images/gallery/test-photo.jpg");
    });
  });

  it("displays loading state initially", () => {
    render(<PhotoCard photo={mockPhoto} onClick={mockOnClick} />);
    // Check for loading spinner (Loader2 icon)
    const loadingSpinner = document.querySelector(".lucide-loader-circle");
    expect(loadingSpinner).toBeInTheDocument();
  });

  it("displays caption when provided", async () => {
    render(<PhotoCard photo={mockPhoto} onClick={mockOnClick} />);

    await waitFor(() => {
      expect(
        screen.getByText("This is a test photo caption for the gallery")
      ).toBeInTheDocument();
    });
  });

  it("does not display caption when not provided", async () => {
    render(<PhotoCard photo={mockPhotoWithoutCaption} onClick={mockOnClick} />);

    await waitFor(() => {
      expect(screen.queryByText(/caption/)).not.toBeInTheDocument();
    });
  });

  it("calls onClick handler when clicked", async () => {
    render(<PhotoCard photo={mockPhoto} onClick={mockOnClick} />);

    const card = screen.getByRole("img").closest(".group");
    expect(card).toBeInTheDocument();

    if (card) {
      fireEvent.click(card);
      expect(mockOnClick).toHaveBeenCalledWith(mockPhoto);
    }
  });

  it("applies correct CSS classes for styling", () => {
    const { container } = render(
      <PhotoCard photo={mockPhoto} onClick={mockOnClick} />
    );
    const card = container.querySelector(".group");
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass("group", "cursor-pointer");
  });

  it("handles image loading states correctly", async () => {
    render(<PhotoCard photo={mockPhoto} onClick={mockOnClick} />);

    // Initially should show loading spinner
    const loadingSpinner = document.querySelector(".lucide-loader-circle");
    expect(loadingSpinner).toBeInTheDocument();

    // After image loads, loading state should be gone
    await waitFor(() => {
      const spinner = document.querySelector(".lucide-loader-circle");
      expect(spinner).not.toBeInTheDocument();
    });
  });
});
