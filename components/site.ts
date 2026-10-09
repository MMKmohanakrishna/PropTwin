/** Sub-path the site is deployed under (e.g. "/proptwin" on GitHub Pages). */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Prefixes a file in `public/` with the deploy sub-path. */
export const asset = (path: string) => `${basePath}${path}`;

export const contact = {
  email: "info@proptwin.in",
  phone: "+91 9160244950",
  phoneHref: "tel:+919160244950",
  whatsappHref:
    "https://wa.me/919160244950?text=" +
    encodeURIComponent("Hi PropTwin, I'd like a quote for a 3D model of my project."),
  addressLines: [
    "3rd Floor, 2161, Social Working Office Space",
    "4th ‘B’ Block, 100 Feet Road",
    "Banashankari 6th Stage, Ganigara Palya",
    "Bengaluru – 560062, Karnataka, India",
  ],
};

export const navLinks = [
  { href: "/solutions", label: "Services" },
  { href: "/experience", label: "Live Project" },
  { href: "/developers", label: "For Developers" },
  { href: "/about", label: "About" },
];

/** Source files we model from. */
export const inputFormats = [
  "DWG",
  "DXF",
  "RVT",
  "IFC",
  "SKP",
  "PDF Plans",
  "FBX",
  "OBJ",
];

/** Formats we deliver. */
export const outputFormats = ["GLB / glTF", "USDZ", "FBX", "4K Renders", "360° Panoramas", "WebXR"];

/** The featured Blender + Unity apartment walkthrough. */
export const featuredProject = {
  name: "Apartment 3D",
  area: "1,457 sq ft",
  layout: "2 BHK + Study",
  tools: ["Blender", "Unity 6 · URP", "WebGL"],
  playerUrl: asset("/walkthrough/index.html"),
  floorPlan: asset("/projects/apartment/floor-plan.png"),
  /** Approximate first-load download; filled in from the WebGL build. */
  downloadSize: "66 MB", // non-breaking space keeps "66 MB" together
  controls: [
    { keys: "W A S D", action: "Walk" },
    { keys: "Mouse", action: "Look around" },
    { keys: "N", action: "Day / night" },
    { keys: "L · K", action: "Room / LED lights" },
    { keys: "Esc", action: "Pause & settings" },
  ],
  touchControls: [
    { keys: "Joystick", action: "Walk" },
    { keys: "Drag", action: "Look around" },
    { keys: "Buttons", action: "Day / night & lights" },
    { keys: "Menu", action: "Pause & settings" },
  ],
};
