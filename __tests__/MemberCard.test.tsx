import { render, screen, fireEvent } from "@testing-library/react";
import { MemberCard } from "@/components/cards/MemberCard";
import { Member } from "@/data/collective";

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

// Mock Next.js Image component
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: any) => (
    <img src={src} alt={alt} {...props} />
  ),
}));

// Mock window.open
const mockWindowOpen = jest.fn();
Object.defineProperty(window, "open", {
  value: mockWindowOpen,
});

const mockMember: Member = {
  id: "test-member-1",
  name: "Test Artist",
  role: "Rappeur Principal",
  bio: "This is a test bio for the artist with detailed information about their background and style.",
  image: "/images/members/test-artist.jpg",
  socialLinks: {
    instagram: "https://instagram.com/testartist",
    twitter: "https://twitter.com/testartist",
    spotify: "https://open.spotify.com/artist/testartist",
  },
};

describe("MemberCard", () => {
  beforeEach(() => {
    mockWindowOpen.mockClear();
  });

  it("renders member name correctly", () => {
    render(<MemberCard member={mockMember} />);
    expect(screen.getByText("Test Artist")).toBeInTheDocument();
  });

  it("renders member role correctly", () => {
    render(<MemberCard member={mockMember} />);
    expect(screen.getByText("Rappeur Principal")).toBeInTheDocument();
  });

  it("renders member bio correctly", () => {
    render(<MemberCard member={mockMember} />);
    expect(
      screen.getByText(/This is a test bio for the artist/)
    ).toBeInTheDocument();
  });

  it("renders member image with correct attributes", () => {
    render(<MemberCard member={mockMember} />);
    const image = screen.getByAltText("Test Artist");
    expect(image).toHaveAttribute("src", "/images/members/test-artist.jpg");
  });

  it("renders social media buttons", () => {
    render(<MemberCard member={mockMember} />);
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(3); // Instagram, Twitter, Spotify
  });

  it("opens social media links when buttons are clicked", () => {
    render(<MemberCard member={mockMember} />);
    const buttons = screen.getAllByRole("button");

    // Click first button (Instagram)
    fireEvent.click(buttons[0]);
    expect(mockWindowOpen).toHaveBeenCalledWith(
      "https://instagram.com/testartist",
      "_blank"
    );
  });

  it("handles member without social links", () => {
    const memberWithoutSocial = { ...mockMember, socialLinks: undefined };
    render(<MemberCard member={memberWithoutSocial} />);

    expect(screen.getByText("Test Artist")).toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("applies correct CSS classes for styling", () => {
    const { container } = render(<MemberCard member={mockMember} />);
    const card = container.querySelector(".group");
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass("group");
  });
});
