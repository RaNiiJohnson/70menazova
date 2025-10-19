// TypeScript interfaces for the rap collective showcase

export interface Member {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  socialLinks?: {
    instagram?: string;
    twitter?: string;
    spotify?: string;
    soundcloud?: string;
    youtube?: string;
  };
}

export interface Video {
  id: string;
  title: string;
  date: string;
  description: string;
  youtubeId: string;
}

export interface Photo {
  id: string;
  src: string;
  alt: string;
  caption?: string;
}

export interface CollectiveData {
  name: string;
  tagline: string;
  description: string;
  members: Member[];
  videos: Video[];
  photos: Photo[];
  socialLinks: {
    youtube?: string;
    instagram?: string;
    facebook?: string;
    spotify?: string;
    soundcloud?: string;
  };
  contact: {
    email: string;
    phone: string;
    location: string;
  };
}

// Mock data for the rap collective
export const collectiveData: CollectiveData = {
  name: "Urban Roots Collective",
  tagline: "L'authenticité malgache dans le rap urbain",
  description:
    "Urban Roots Collective est un collectif de rap basé à Madagascar qui fusionne les rythmes urbains contemporains avec l'authenticité culturelle malgache. Nous créons une musique qui raconte nos histoires, nos luttes et nos espoirs à travers des beats puissants et des paroles sincères.",

  members: [
    {
      id: "member-1",
      name: "MC Tanindrazana",
      role: "Rappeur Principal",
      bio: "Artiste passionné qui mélange les influences traditionnelles malgaches avec le rap moderne. Ses textes parlent de l'identité culturelle et des défis de la jeunesse urbaine.",
      image: "/images/members/mc-tanindrazana.jpg",
      socialLinks: {
        instagram: "https://instagram.com/mctanindrazana",
        spotify: "https://open.spotify.com/artist/mctanindrazana",
      },
    },
    {
      id: "member-2",
      name: "DJ Malagasy Beats",
      role: "DJ & Producteur",
      bio: "Producteur talentueux spécialisé dans la création de beats qui incorporent des instruments traditionnels malgaches. Il apporte la dimension sonore unique au collectif.",
      image: "/images/members/dj-malagasy.jpg",
      socialLinks: {
        instagram: "https://instagram.com/djmalagasybeats",
        soundcloud: "https://soundcloud.com/djmalagasybeats",
      },
    },
    {
      id: "member-3",
      name: "Lyrical Vahiny",
      role: "Rappeur & Parolier",
      bio: "Maître des mots et des rimes, il excelle dans l'art du storytelling à travers ses textes percutants qui reflètent la réalité sociale malgache.",
      image: "/images/members/lyrical-vahiny.jpg",
      socialLinks: {
        instagram: "https://instagram.com/lyricalvahiny",
        twitter: "https://twitter.com/lyricalvahiny",
      },
    },
    {
      id: "member-4",
      name: "Beatbox Gasy",
      role: "Beatboxer",
      bio: "Virtuose du beatbox qui apporte une dimension live unique aux performances du collectif. Il maîtrise les techniques modernes tout en intégrant des sonorités traditionnelles.",
      image: "/images/members/beatbox-gasy.jpg",
      socialLinks: {
        instagram: "https://instagram.com/beatboxgasy",
        youtube: "https://youtube.com/@beatboxgasy",
      },
    },
  ],

  videos: [
    {
      id: "video-1",
      title: "Tanindrazana - Clip Officiel",
      date: "2024-03-15",
      description:
        "Notre premier single qui célèbre l'amour de la patrie malgache à travers des rythmes rap contemporains et des paroles authentiques.",
      youtubeId: "dQw4w9WgXcQ",
    },
    {
      id: "video-2",
      title: "Urban Roots Cypher Vol.1",
      date: "2024-02-28",
      description:
        "Session freestyle où chaque membre du collectif démontre ses compétences lyriques dans un cypher urbain authentique.",
      youtubeId: "dQw4w9WgXcQ",
    },
    {
      id: "video-3",
      title: "Fihavanana (Brotherhood)",
      date: "2024-01-20",
      description:
        "Un morceau puissant sur l'unité et la fraternité dans la communauté urbaine malgache, avec des visuels tournés dans les rues d'Antananarivo.",
      youtubeId: "dQw4w9WgXcQ",
    },
    {
      id: "video-4",
      title: "Behind the Beats - Studio Session",
      date: "2024-01-05",
      description:
        "Immersion dans notre processus créatif en studio, montrant comment nous créons nos beats uniques qui mélangent tradition et modernité.",
      youtubeId: "dQw4w9WgXcQ",
    },
    {
      id: "video-5",
      title: "Live Performance - Festival Urbain",
      date: "2023-12-10",
      description:
        "Performance live énergique lors du Festival Urbain de Madagascar, capturant l'essence de notre musique en direct.",
      youtubeId: "dQw4w9WgXcQ",
    },
    {
      id: "video-6",
      title: "Remix Collaboration",
      date: "2023-11-25",
      description:
        "Collaboration spéciale avec d'autres artistes malgaches pour un remix explosif qui unit différents styles musicaux.",
      youtubeId: "dQw4w9WgXcQ",
    },
  ],

  photos: [
    {
      id: "photo-1",
      src: "/images/gallery/studio-session-1.jpg",
      alt: "Session d'enregistrement en studio",
      caption:
        "Moment créatif en studio lors de l'enregistrement de notre dernier EP",
    },
    {
      id: "photo-2",
      src: "/images/gallery/live-performance-1.jpg",
      alt: "Performance live sur scène",
      caption: "Énergie pure lors de notre concert au Festival Urbain 2024",
    },
    {
      id: "photo-3",
      src: "/images/gallery/group-photo-1.jpg",
      alt: "Photo de groupe du collectif",
      caption:
        "Urban Roots Collective - Unis par la passion du rap authentique",
    },
    {
      id: "photo-4",
      src: "/images/gallery/street-art-1.jpg",
      alt: "Art urbain et graffiti",
      caption:
        "L'art urbain qui inspire notre musique dans les rues d'Antananarivo",
    },
    {
      id: "photo-5",
      src: "/images/gallery/recording-booth.jpg",
      alt: "Enregistrement vocal en cabine",
      caption: "MC Tanindrazana en pleine session d'enregistrement vocal",
    },
    {
      id: "photo-6",
      src: "/images/gallery/dj-setup.jpg",
      alt: "Setup DJ et production",
      caption:
        "DJ Malagasy Beats à l'œuvre sur ses platines et équipements de production",
    },
    {
      id: "photo-7",
      src: "/images/gallery/cypher-session.jpg",
      alt: "Session de cypher freestyle",
      caption: "Moment intense lors d'une session de cypher improvisée",
    },
    {
      id: "photo-8",
      src: "/images/gallery/backstage.jpg",
      alt: "Coulisses avant concert",
      caption:
        "Préparation et concentration en coulisses avant de monter sur scène",
    },
    {
      id: "photo-9",
      src: "/images/gallery/crowd-energy.jpg",
      alt: "Énergie du public en concert",
      caption:
        "L'énergie incroyable du public malgache lors de nos performances",
    },
  ],

  socialLinks: {
    youtube: "https://youtube.com/@urbanrootscollective",
    instagram: "https://instagram.com/urbanrootscollective",
    facebook: "https://facebook.com/urbanrootscollective",
    spotify: "https://open.spotify.com/artist/urbanrootscollective",
    soundcloud: "https://soundcloud.com/urbanrootscollective",
  },

  contact: {
    email: "contact@urbanrootscollective.mg",
    phone: "+261 34 12 345 67",
    location: "Antananarivo, Madagascar",
  },
};
