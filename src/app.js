import React, {
  useEffect,
  useMemo,
  useState,
} from "https://esm.sh/react@18.3.1";
import { createRoot } from "https://esm.sh/react-dom@18.3.1/client";
import { motion, AnimatePresence } from "https://esm.sh/framer-motion@11.11.17";

const e = React.createElement;

const navItems = [
  ["Home", "home"],
  ["About", "about"],
  ["Projects", "projects"],
  ["Events", "events"],
  ["Membership", "membership"],
  // ["Donate", "donate"],
  ["Stories", "stories"],
];

const icons = {
  menu: "M4 6h16M4 12h16M4 18h16",
  close: "M6 6l12 12M18 6L6 18",
  arrow: "M5 12h14m-6-6 6 6-6 6",
  top: "M12 19V5m-7 7 7-7 7 7",
  check: "M5 13l4 4L19 7",
  mail: "M4 6h16v12H4z M4 7l8 6 8-6",
  calendar: "M7 3v4M17 3v4M4 9h16M5 5h14v16H5z",
  heart:
    "M20.5 8.7c0 5.6-8.5 10.3-8.5 10.3S3.5 14.3 3.5 8.7A4.7 4.7 0 0 1 12 6a4.7 4.7 0 0 1 8.5 2.7z",
  users:
    "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  globe:
    "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20M2 12h20M12 2a15.3 15.3 0 0 1 0 20M12 2a15.3 15.3 0 0 0 0 20",
};

function Icon({ name, className = "h-5 w-5" }) {
  return e(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 2,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className,
      "aria-hidden": "true",
    },
    e("path", { d: icons[name] })
  );
}

function Button({ children, href = "#", variant = "primary", icon = "arrow" }) {
  const styles = {
    primary:
      "bg-[#f7a81b] text-rotary-ink hover:bg-white shadow-lg shadow-yellow-900/10",
    secondary:
      "bg-white text-[#17458f] hover:bg-rotary-mist shadow-lg shadow-blue-900/10",
    outline:
      "border border-white/55 text-white hover:bg-white hover:text-[#17458f]",
    blue: "bg-[#17458f] text-white hover:bg-rotary-deep shadow-lg shadow-blue-900/15",
  };
  return e(
    "a",
    {
      href,
      className: `inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition duration-200 ${styles[variant]}`,
    },
    children,
    icon && Icon({ name: icon, className: "h-4 w-4" })
  );
}

function SectionHeading({ eyebrow, title, copy, align = "left" }) {
  return e(
    "div",
    {
      className: `mx-auto mb-10 max-w-3xl ${
        align === "center" ? "text-center" : ""
      }`,
    },
    e(
      "p",
      {
        className:
          "mb-3 text-sm font-extrabold uppercase tracking-[0.24em] text-[#17458f]",
      },
      eyebrow
    ),
    e("h2", { className: "fluid-heading font-black text-rotary-ink" }, title),
    copy &&
      e(
        "p",
        { className: "mt-4 text-base leading-8 text-slate-600 sm:text-lg" },
        copy
      )
  );
}

function Reveal({ children, delay = 0 }) {
  return e(
    motion.div,
    {
      initial: { opacity: 0, y: 22 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, amount: 0.18 },
      transition: { duration: 0.55, delay },
    },
    children
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = navItems.map(([label, id]) =>
    e(
      "a",
      {
        key: id,
        href: `#${id}`,
        onClick: () => setOpen(false),
        className: `rounded-full px-3 py-2 text-sm font-bold ${
          scrolled ? "black" : "black"
        } transition hover:bg-rotary-mist hover:text-[#17458f]`,
      },
      label
    )
  );

  return e(
    "header",
    {
      className: `fixed inset-x-0 top-0 z-50 transition ${
        scrolled
          ? "bg-white/95 shadow-sm backdrop-blur"
          : "bg-white/95 backdrop-blur"
      }`,
    },
    e(
      "nav",
      {
        className:
          "mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8",
        "aria-label": "Main navigation",
      },
      e(
        "a",
        {
          href: "#home",
          className: "flex items-center gap-3 font-black text-rotary-ink",
        },
        e(
          "span",
          {
            className: "grid h-11 place-items-center overflow-hidden",
          },
          e("img", {
            src: "./img/club-logo.png",
            alt: "Rotary Logo",
            className: "h-11",
          })
        )
        // e(
        //   "span",
        //   { className: `leading-tight ${scrolled ? "" : "text-white"}` },
        //   "Rotary eClub Of",
        //   e(
        //     "span",
        //     {
        //       className: `block text-xs font-extrabold uppercase tracking-[0.22em] text-[#17458f] ${
        //         scrolled ? "" : "text-white"
        //       }`,
        //     },
        //     "Collected Minds"
        //   )
        // )
      ),
      e("div", { className: "hidden items-center gap-1 lg:flex" }, links),
      e(
        "div",
        { className: "hidden items-center gap-3 lg:flex" },
        Button({
          href: "#membership",
          variant: "blue",
          icon: null,
          children: "Join Us",
        })
      ),
      e(
        "button",
        {
          className: `grid h-11 w-11 place-items-center rounded-full border ${
            scrolled
              ? "text-rotary-ink border-rotary-ink"
              : "text-rotary-ink border-rotary-ink"
          }  lg:hidden`,
          onClick: () => setOpen(true),
          "aria-label": "Open navigation menu",
        },
        Icon({ name: "menu" })
      )
    ),
    e(
      AnimatePresence,
      null,
      open &&
        e(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
            className: "fixed inset-0 z-50 bg-rotary-ink/45 lg:hidden",
          },
          e(
            motion.div,
            {
              initial: { x: "100%" },
              animate: { x: 0 },
              exit: { x: "100%" },
              transition: { type: "spring", damping: 28, stiffness: 260 },
              className: `ml-auto min-h-screen w-[86vw] max-w-sm ${
                scrolled ? "bg-white" : "bg-white"
              }  p-5 shadow-soft`,
            },
            e(
              "div",
              { className: "mb-8 flex items-center justify-between" },
              e("strong", { className: "text-lg text-rotary-ink" }, "Menu"),
              e(
                "button",
                {
                  className:
                    "grid h-11 w-11 place-items-center rounded-full bg-rotary-mist",
                  onClick: () => setOpen(false),
                  "aria-label": "Close navigation menu",
                },
                Icon({ name: "close" })
              )
            ),
            e("div", { className: "grid gap-2" }, links),
            e(
              "div",
              { className: "mt-8 grid gap-3" },
              Button({
                href: "#membership",
                variant: "blue",
                children: "Join Us",
              })
            )
          )
        )
    )
  );
}

// function Hero() {
//   return e(
//     "section",
//     { id: "home", className: "hero-image relative min-h-[92svh] overflow-hidden pt-24 text-white" },
//     e(
//       "div",
//       { className: "mx-auto grid min-h-[calc(92svh-6rem)] max-w-7xl content-end gap-8 px-4 pb-8 sm:px-6 lg:px-8 lg:pb-12" },
//       e(
//         Reveal,
//         null,
//         e("p", { className: "mb-4 inline-flex w-fit rounded-full border border-white/35 bg-white/12 px-4 py-2 text-sm font-bold backdrop-blur" }, "Newly chartered. Purpose built for impact."),
//         e("h1", { className: "fluid-title max-w-5xl font-black" }, "Service Above Self — Building Communities, Creating Impact"),
//         e("p", { className: "mt-5 max-w-2xl text-lg leading-8 text-white/88 sm:text-xl" }, "A leadership-centered Rotary Club mobilizing professionals, partners, and neighbors to solve real community challenges with dignity, fellowship, and measurable service."),
//         e("div", { className: "mt-7 flex flex-col gap-3 sm:flex-row" }, Button({ href: "#membership", children: "Join Us" }),
//         // Button({ href: "#events", variant: "secondary", children: "Attend a Meeting" }),
//         // Button({ href: "#donate", variant: "outline", children: "Donate" })
//         )
//       ),
//       e(
//         "div",
//         { className: "glass grid gap-3 rounded-2xl p-4 text-rotary-ink shadow-soft sm:grid-cols-3 lg:max-w-3xl" },
//         ["Weekly Fellowships", "Transparent Projects", "Youth Leadership"].map((item) =>
//           e("div", { key: item, className: "rounded-xl bg-white p-4" }, e("p", { className: "text-sm font-black" }, item), e("p", { className: "mt-1 text-sm text-slate-600" }, "Designed for service-minded people ready to lead."))
//         )
//       )
//     )
//   );
// }

function Hero() {
  const highlights = [
    {
      title: "Fellowships",
      description: "Building strong friendships across the globe",
    },
    {
      title: "Service Projects",
      description:
        "Creating lasting impact through sustainable community based service projects ",
    },
    {
      title: "Leadership",
      description: "Developing strategic leadership skills and mentorship",
    },
  ];

  return e(
    "section",
    {
      id: "home",
      className:
        "hero-image relative min-h-[92svh] overflow-hidden pt-24 text-white",
    },

    e(
      "div",
      {
        className:
          "mx-auto grid min-h-[calc(92svh-6rem)] max-w-7xl content-end gap-8 px-4 pb-8 sm:px-6 lg:px-8 lg:pb-12",
      },

      e(
        Reveal,
        null,

        e(
          "p",
          {
            className:
              "mb-4 inline-flex w-fit rounded-full border border-white/35 bg-white/12 px-4 py-2 text-sm font-bold backdrop-blur",
          },
          "Purpose built for impact."
        ),

        e(
          "h1",
          { className: "fluid-title max-w-5xl font-black" },
          "Service Above Self — Building Communities, Creating Impact"
        ),

        e(
          "p",
          {
            className:
              "mt-5 max-w-2xl text-lg leading-8 text-white/88 sm:text-xl",
          },
          "A leadership- centered, community service driven Rotary Club, mobilizing professionals and business men/women to create lasting impact in our communities and across the globe."
        ),

        e(
          "div",
          { className: "mt-7 flex flex-col gap-3 sm:flex-row" },

          Button({
            href: "#membership",
            children: "Join Us",
          })

          // Button({ href: "#events", variant: "secondary", children: "Attend a Meeting" }),
          // Button({ href: "#donate", variant: "outline", children: "Donate" })
        )
      ),

      e(
        "div",
        {
          className:
            "glass grid gap-3 rounded-2xl p-4 text-rotary-ink shadow-soft sm:grid-cols-3 lg:max-w-3xl",
        },

        highlights.map((item) =>
          e(
            "div",
            {
              key: item.title,
              className: "rounded-xl bg-white p-4",
            },

            e("p", { className: "text-sm font-black" }, item.title),

            e(
              "p",
              {
                className: "mt-1 text-sm text-slate-600",
              },
              item.description
            )
          )
        )
      )
    )
  );
}

function About() {
  const values = [
    [
      "Fellowship",
      "Meaningful relationships across professions and generations.",
      "users",
    ],
    [
      "Leadership",
      "Mentorship, public service, and ethical action in every project.",
      "check",
    ],
    [
      "Community Service",
      "Hands-on interventions shaped by local needs.",
      "heart",
    ],
    [
      "Youth Development",
      "Programs that equip the next generation to lead.",
      "globe",
    ],
  ];
  return e(
    "section",
    { id: "about", className: "section-pad bg-white px-4 sm:px-6 lg:px-8" },
    e(
      "div",
      { className: "mx-auto max-w-7xl" },
      e(SectionHeading, {
        eyebrow: "About the club",
        title:
          "A modern Rotary home for leaders who turn goodwill into action.",
        copy: "Inspired by the structure and professionalism of established E-Clubs, Rotary E-Club of Connected Minds, Nigeria (District 9126) combines the traditional Rotary Club model with responsive digital engagement, partnerships and service projects to create lasting change in our communities",
      }),
      e(
        "div",
        { className: "grid gap-5 md:grid-cols-2 lg:grid-cols-4" },
        values.map(([title, copy, icon], index) =>
          e(
            Reveal,
            { key: title, delay: index * 0.05 },
            e(
              "article",
              {
                className:
                  "h-full rounded-2xl border border-slate-100 bg-white p-6 shadow-soft",
              },
              Icon({ name: icon, className: "mb-5 h-8 w-8 text-[#17458f]" }),
              e("h3", { className: "text-xl font-black" }, title),
              e("p", { className: "mt-3 leading-7 text-slate-600" }, copy)
            )
          )
        )
      ),
      e(
        "div",
        { className: "mt-10 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]" },
        e(
          "div",
          { className: "rounded-2xl bg-rotary-mist p-6 sm:p-8" },
          e("h3", { className: "text-2xl font-black" }, "Mission & Vision"),
          e(
            "p",
            { className: "mt-4 leading-8 text-slate-700" },
            "Our mission is to provide service to others, promote integrity, and advance world understanding, goodwill, and peace through our fellowship of business, professional, and community leaders"
          ),
          e(
            "p",
            { className: "mt-4 leading-8 text-slate-700" },
            "Together, we see a world where people unite and take action to create lasting change — across the globe, in our communities, and in ourselves."
          )
        ),
        e(
          "ol",
          { className: "grid gap-4" },
          [
            "Is it the TRUTH?",
            "Is it FAIR to all concerned?",
            "Will it build GOODWILL and BETTER FRIENDSHIPS?",
            "Will it be BENEFICIAL to all concerned?",
          ].map((item, i) =>
            e(
              "li",
              {
                key: item,
                className:
                  "flex gap-4 rounded-2xl border border-slate-100 p-5 shadow-sm",
              },
              e(
                "span",
                {
                  className:
                    "grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#f7a81b] font-black text-rotary-ink",
                },
                `0${i + 1}`
              ),
              e(
                "span",
                { className: "self-center font-bold text-slate-700" },
                item
              )
            )
          )
        )
      )
    )
  );
}

function Team() {
  const people = [
    [
      "Rtn Adebayo Taofeek Akande",
      "President",
      "Strategy leader focused on partnerships, governance, and measurable community transformation.",
    ],
    [
      "Rtn Amiomode Patience Ogunleye",
      "Secretary",
      "Operations builder keeping meetings, records, and member communications crisp and dependable.",
    ],
    [
      "Rtn Itunu Adesola Adeyemi",
      "Treasurer",
      "Exemplary stewardship, transparency, and financial integrity",
    ],
    // [
    //   "David Mensah",
    //   "Membership Chair",
    //   "Community connector helping service-minded professionals find their Rotary pathway.",
    // ],
  ];
  return e(
    "section",
    { className: "section-pad bg-rotary-mist px-4 sm:px-6 lg:px-8" },
    e(
      "div",
      { className: "mx-auto max-w-7xl" },
      e(SectionHeading, {
        eyebrow: "Leadership",
        title: "Credible leaders, approachable stewards.",
        copy: "Our leadership team combines deep expertise with a people-first mindset, guiding the organization with integrity, transparency, and purpose. As approachable stewards, they foster trust, empower collaboration, and lead with a clear commitment to sustainable growth and shared success.",
      }),
      e(
        "div",
        { className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-4" },
        people.map(([name, role, bio], i) =>
          e(
            Reveal,
            { key: name, delay: i * 0.05 },
            e(
              "article",
              { className: "rounded-2xl bg-white p-6 text-center shadow-soft" },
              e("img", {
                className:
                  "mx-auto h-28 w-28 rounded-full object-cover ring-4 ring-[#f7a81b]",
                src: `https://images.unsplash.com/photo-${
                  [
                    "1500648767791-00dcc994a43e",
                    "1494790108377-be9c29b29330",
                    "1544005313-94ddf0286df2",
                    // "1507003211169-0a1dd7228f2d",
                  ][i]
                }?auto=format&fit=crop&w=300&q=80`,
                alt: `${name}, ${role}`,
                loading: "lazy",
              }),
              e("h3", { className: "mt-5 text-xl font-black" }, name),
              e("p", { className: "font-bold text-[#17458f]" }, role),
              e(
                "p",
                { className: "mt-3 text-sm leading-6 text-slate-600" },
                bio
              )
              // e(
              //   "div",
              //   { className: "mt-4 flex justify-center gap-2" },
              //   ["in", "x", "m"].map((s) =>
              //     e(
              //       "a",
              //       {
              //         key: s,
              //         href: "#",
              //         className: "grid h-9 w-9 place-items-center rounded-full bg-rotary-mist text-xs font-black text-[#17458f]",
              //         "aria-label": `${name} social link`,
              //       },
              //       s
              //     )
              //   )
              // )
            )
          )
        )
      )
    )
  );
}

function Projects() {
  const stats = [
    ["Volunteer Hours", "-"],
    ["People Reached", "-"],
    ["Projects Completed", "-"],
    ["Funds Raised", "$0"],
  ];
  // const projects = [
  //   [
  //     "Education",
  //     "Back-to-school kits",
  //     "Equipping pupils with supplies, mentoring, and reading circles.",
  //   ],
  //   [
  //     "Health",
  //     "Community screening day",
  //     "Preventive health checks delivered with clinical partners.",
  //   ],
  //   [
  //     "Environment",
  //     "Clean water advocacy",
  //     "Awareness and cleanup drives supporting healthier neighborhoods.",
  //   ],
  //   [
  //     "Youth Empowerment",
  //     "Rotaract leadership lab",
  //     "Career skills, ethics, and service design for young leaders.",
  //   ],
  // ];
  return e(
    "section",
    { id: "projects", className: "section-pad bg-white px-4 sm:px-6 lg:px-8" },
    e(
      "div",
      { className: "mx-auto max-w-7xl" },
      e(SectionHeading, {
        eyebrow: "Projects & impact",
        title: "From good intentions to visible, reported outcomes.",
        copy: "Project cards, counters, and galleries are ready for real impact data as the club grows.",
      }),
      e(
        "div",
        { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4" },
        stats.map(([label, value]) =>
          e(
            "div",
            {
              key: label,
              className: "rounded-2xl bg-[#17458f] p-6 text-white",
            },
            e("p", { className: "text-4xl font-black" }, value),
            e("p", { className: "mt-2 text-sm font-bold text-white/80" }, label)
          )
        )
      )
      // e(
      //   "div",
      //   {
      //     className:
      //       "no-scrollbar mt-8 flex snap-x gap-5 overflow-x-auto pb-3 lg:grid lg:grid-cols-4 lg:overflow-visible",
      //   },
      //   projects.map(([cat, title, copy], i) =>
      //     e(
      //       "article",
      //       {
      //         key: title,
      //         className:
      //           "min-w-[82vw] snap-start overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-soft sm:min-w-[45vw] lg:min-w-0",
      //       },
      //       e("img", {
      //         src: `https://images.unsplash.com/photo-${
      //           [
      //             "1488521787991-ed7bbaae773c",
      //             "1576091160550-2173dba999ef",
      //             "1532601224476-15c79f2f7a51",
      //             "1522202176988-66273c2fd55f",
      //           ][i]
      //         }?auto=format&fit=crop&w=700&q=80`,
      //         alt: title,
      //         className: "h-48 w-full object-cover",
      //         loading: "lazy",
      //       }),
      //       e(
      //         "div",
      //         { className: "p-5" },
      //         e(
      //           "span",
      //           {
      //             className:
      //               "rounded-full bg-[#f7a81b] px-3 py-1 text-xs font-black text-rotary-ink",
      //           },
      //           cat
      //         ),
      //         e("h3", { className: "mt-4 text-xl font-black" }, title),
      //         e("p", { className: "mt-3 leading-7 text-slate-600" }, copy)
      //         // e("a", { href: "#donate", className: "mt-5 inline-flex font-black text-[#17458f]" }, "Support this project")
      //       )
      //     )
      //   )
      // )
    )
  );
}

function Events() {
  const events = [
    ["11", "May", "Planning Meeting", "Virtual", "Sunday, 19:00 (WAT)"],
    ["13", "May", "Onboarding Meeting", "Virtual", "Saturday, 19:00 (WAT)"],
    ["24", "May", "Inaugural Fellowship", "Virtual", "Sunday, 19:00 (WAT)"],
  ];
  return e(
    "section",
    {
      id: "events",
      className: "section-pad bg-rotary-mist px-4 sm:px-6 lg:px-8",
    },
    e(
      "div",
      { className: "mx-auto max-w-7xl" },
      e(SectionHeading, {
        eyebrow: "Events & meetings",
        title: "Easy ways to show up, serve, and belong.",
        copy: "We meet fortnightly on Sundays",
      }),
      e(
        "div",
        { className: "grid gap-5 lg:grid-cols-3" },
        events.map(([day, month, title, badge, time]) =>
          e(
            "article",
            {
              key: title,
              className: "flex gap-4 rounded-2xl bg-white p-5 shadow-soft",
            },
            e(
              "div",
              {
                className:
                  "grid h-20 w-20 shrink-0 place-items-center rounded-2xl bg-[#17458f] text-center text-white",
              },
              e("span", { className: "text-3xl font-black" }, day),
              e("span", { className: "text-xs font-bold uppercase" }, month)
            ),
            e(
              "div",
              null,
              e(
                "span",
                {
                  className:
                    "rounded-full bg-[#f7a81b] px-3 py-1 text-xs font-black",
                },
                badge
              ),
              e("h3", { className: "mt-3 text-lg font-black" }, title),
              e(
                "p",
                { className: "mt-1 text-sm font-bold text-slate-500" },
                time
              ),
              e(
                "a",
                {
                  href: "#membership",
                  className:
                    "mt-4 inline-flex rounded-full bg-[#17458f] px-4 py-2 text-sm font-black text-white",
                },
                "RSVP"
              )
            )
          )
        )
      )
    )
  );
}

// function Membership() {
//   const [open, setOpen] = useState(0);
//   const faqs = ["Do I need previous Rotary experience?", "How often does the club meet?", "Can busy professionals join?", "Are corporate memberships available?"];
//   return e(
//     "section",
//     { id: "membership", className: "section-pad bg-white px-4 sm:px-6 lg:px-8" },
//     e(
//       "div",
//       { className: "mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr]" },
//       e("div", null, e(SectionHeading, { eyebrow: "Membership", title: "Join leaders creating lasting change.", copy: "A conversion-focused membership experience with benefits, process, testimonials, FAQ, and application form." }), e("div", { className: "grid gap-4" }, ["Attend an open fellowship", "Meet the membership committee", "Choose a service area", "Complete onboarding and induction"].map((step, i) => e("div", { key: step, className: "flex gap-4 rounded-2xl border border-slate-100 p-4" }, e("span", { className: "font-black text-[#17458f]" }, `0${i + 1}`), e("strong", null, step))))),
//       e("div", { className: "rounded-2xl bg-rotary-mist p-5 sm:p-8" }, e("form", { className: "grid gap-4", onSubmit: (event) => event.preventDefault() }, ["Full name", "Email address", "Profession or organization"].map((label) => e("label", { key: label, className: "grid gap-2 text-sm font-bold" }, label, e("input", { className: "min-h-12 rounded-xl border border-slate-200 px-4", placeholder: label }))), e("label", { className: "grid gap-2 text-sm font-bold" }, "Why do you want to join?", e("textarea", { className: "min-h-28 rounded-xl border border-slate-200 p-4", placeholder: "Tell us about your service interests." })), e("button", { className: "min-h-12 rounded-full bg-[#17458f] px-5 font-black text-white" }, "Submit Interest Form")), e("div", { className: "mt-8 grid gap-3" }, faqs.map((q, i) => e("div", { key: q, className: "rounded-xl bg-white" }, e("button", { className: "flex w-full items-center justify-between p-4 text-left font-black", onClick: () => setOpen(open === i ? -1 : i), "aria-expanded": open === i }, q, e("span", null, open === i ? "-" : "+")), open === i && e("p", { className: "px-4 pb-4 leading-7 text-slate-600" }, "No, you don’t need previous Rotary experience — we welcome individuals from all backgrounds who are passionate about service, leadership, and making a positive impact in the community.")))))
//     )
//   );
// }

function Membership() {
  const [open, setOpen] = useState(0);

  const faqs = [
    {
      question: "Do I need previous Rotary experience?",
      answer:
        "No, you don’t need previous Rotary experience — we welcome individuals from all backgrounds who are passionate about service, leadership, and making a positive impact in the community.",
    },
    {
      question: "How often does the club meet?",
      answer:
        "The club meets three times a month for fellowship, networking, and service activities, with schedules designed to accommodate professionals and business leaders.",
    },
    {
      question: "Can busy professionals join?",
      answer:
        "Absolutely. Our club is structured to provide flexible opportunities for engagement while respecting the demands of professional and personal commitments.",
    },
    {
      question: "Are corporate memberships available?",
      answer:
        "Yes, we offer corporate membership options that allow organizations to engage employees in leadership, networking, and community impact initiatives.",
    },
  ];

  return e(
    "section",
    {
      id: "membership",
      className: "section-pad bg-white px-4 sm:px-6 lg:px-8",
    },
    e(
      "div",
      {
        className: "mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr]",
      },

      e(
        "div",
        null,
        e(SectionHeading, {
          eyebrow: "Membership",
          title: "Join leaders creating lasting change.",
          copy: "A conversion-focused membership experience with benefits, process, testimonials, FAQ, and application form.",
        }),

        e(
          "div",
          { className: "grid gap-4" },
          [
            "Indicate interest",
            "Attend a fellowship",
            "Interact with the Membership Committee",
            "Complete on-boarding",
            "Induction",
          ].map((step, i) =>
            e(
              "div",
              {
                key: step,
                className: "flex gap-4 rounded-2xl border border-slate-100 p-4",
              },
              e(
                "span",
                { className: "font-black text-[#17458f]" },
                `0${i + 1}`
              ),
              e("strong", null, step)
            )
          )
        )
      ),

      e(
        "div",
        { className: "rounded-2xl bg-rotary-mist p-5 sm:p-8" },

        e(
          "form",
          {
            className: "grid gap-4",
            onSubmit: (event) => event.preventDefault(),
          },

          ["Full name", "Email address", "Profession or organization"].map(
            (label) =>
              e(
                "label",
                { key: label, className: "grid gap-2 text-sm font-bold" },
                label,
                e("input", {
                  className: "min-h-12 rounded-xl border border-slate-200 px-4",
                  placeholder: label,
                })
              )
          ),

          e(
            "label",
            { className: "grid gap-2 text-sm font-bold" },
            "Why do you want to join?",
            e("textarea", {
              className: "min-h-28 rounded-xl border border-slate-200 p-4",
              placeholder: "Tell us about your service interests.",
            })
          ),

          e(
            "button",
            {
              className:
                "min-h-12 rounded-full bg-[#17458f] px-5 font-black text-white",
            },
            "Submit Interest Form"
          )
        ),

        e(
          "div",
          { className: "mt-8 grid gap-3" },

          faqs.map((faq, i) =>
            e(
              "div",
              {
                key: faq.question,
                className: "rounded-xl bg-white",
              },

              e(
                "button",
                {
                  className:
                    "flex w-full items-center justify-between p-4 text-left font-black",
                  onClick: () => setOpen(open === i ? -1 : i),
                  "aria-expanded": open === i,
                },
                faq.question,
                e("span", null, open === i ? "-" : "+")
              ),

              open === i &&
                e(
                  "p",
                  {
                    className: "px-4 pb-4 leading-7 text-slate-600",
                  },
                  faq.answer
                )
            )
          )
        )
      )
    )
  );
}

// function Donate() {
//   const packages = [["Friend", "$50", "Supplies one child with school essentials."], ["Builder", "$250", "Sponsors outreach logistics and volunteer materials."], ["Partner", "$1,000+", "Funds signature projects with recognition and reporting."]];
//   return e(
//     "section",
//     { id: "donate", className: "section-pad bg-[#17458f] px-4 text-white sm:px-6 lg:px-8" },
//     e(
//       "div",
//       { className: "mx-auto max-w-7xl" },
//       e(SectionHeading, {
//         eyebrow: "Donations & partnerships",
//         title: "Transparent giving for measurable community impact.",
//         copy: "Donation and sponsorship packages make it clear how support becomes service.",
//         align: "center",
//       }),
//       e(
//         "div",
//         { className: "grid gap-5 md:grid-cols-3" },
//         packages.map(([name, price, copy]) =>
//           e(
//             "article",
//             { key: name, className: "rounded-2xl bg-white p-6 text-rotary-ink shadow-soft" },
//             e("h3", { className: "text-2xl font-black" }, name),
//             e("p", { className: "mt-3 text-4xl font-black text-[#17458f]" }, price),
//             e("p", { className: "mt-4 leading-7 text-slate-600" }, copy),
//             Button({ href: "#", variant: "primary", children: name === "Partner" ? "Become a Partner" : "Donate Now" })
//           )
//         )
//       ),
//       e(
//         "div",
//         { className: "mt-8 rounded-2xl border border-white/20 p-6 text-center" },
//         e("p", { className: "font-bold text-white/85" }, "Corporate partners, NGOs, schools, hospitals, and civic institutions can collaborate on targeted service programs.")
//       )
//     )
//   );
// }

function Stories() {
  const stories = [
    [
      "Member Spotlight",
      "Why service leadership still matters",
      "A profile on professional fellowship and ethical action.",
    ],
    [
      "Community Update",
      "Planning a healthier outreach model",
      "How partners help move from activity to outcomes.",
    ],
    [
      "Youth",
      "Mentorship circles for emerging leaders",
      "Preparing young people with practical leadership habits.",
    ],
    [
      "Impact",
      "What transparent reporting builds",
      "Trust grows when communities can see the work clearly.",
    ],
  ];
  return e(
    "section",
    { id: "stories", className: "section-pad bg-white px-4 sm:px-6 lg:px-8" },
    e(
      "div",
      { className: "mx-auto max-w-7xl" },
      e(SectionHeading, {
        eyebrow: "News & stories",
        title: "Human-centered updates that make the club feel alive.",
        copy: "Stay connected with the latest stories, service projects, milestones, and community impact from our club, District 9126 and Rotary International — showcasing the people, partnerships, and moments that bring our mission to life.",
      })
      // e(
      //   "div",
      //   { className: "masonry" },
      //   stories.map(([cat, title, copy], i) =>
      //     e(
      //       "article",
      //       {
      //         key: title,
      //         className:
      //           "overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-soft",
      //       },
      //       e("img", {
      //         src: `https://images.unsplash.com/photo-${
      //           [
      //             "1517048676732-d65bc937f952",
      //             "1556761175-b413da4baf72",
      //             "1529156069898-49953e39b3ac",
      //             "1551836022-d5d88e9218df",
      //           ][i]
      //         }?auto=format&fit=crop&w=800&q=80`,
      //         alt: title,
      //         className: `w-full object-cover ${i % 2 ? "h-56" : "h-72"}`,
      //         loading: "lazy",
      //       }),
      //       e(
      //         "div",
      //         { className: "p-5" },
      //         e(
      //           "span",
      //           {
      //             className:
      //               "text-xs font-black uppercase tracking-[0.18em] text-[#17458f]",
      //           },
      //           cat
      //         ),
      //         e("h3", { className: "mt-3 text-xl font-black" }, title),
      //         e("p", { className: "mt-3 leading-7 text-slate-600" }, copy),
      //         e("a", {
      //           href: "#",
      //           className: "mt-5 inline-flex font-black text-[#17458f]",
      //         })
      //       )
      //     )
      //   )
      // )
    )
  );
}

function Footer() {
  return e(
    "footer",
    { className: "bg-[#17458f] px-4 py-12 text-white sm:px-6 lg:px-8" },
    e(
      "div",
      {
        className:
          "mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.2fr_0.8fr_0.8fr]",
      },
      e(
        "div",
        null,
        e(
          "h2",
          { className: "text-2xl font-black" },
          "Rotary E-Club Of Connected Minds, Nigeria"
        ),
        e(
          "p",
          { className: "mt-4 max-w-lg leading-7 text-white/70" },
          "Meeting on fortnightly Sundays (19:00 WAT) online to advance fellowship, leadership, and community impact."
        ),
        e("form", {
          className: "mt-6 flex max-w-md gap-2",
          onSubmit: (event) => event.preventDefault(),
        })
      ),
      e(
        "div",
        null,
        e("h3", { className: "font-black" }, "Contact"),
        e(
          "p",
          { className: "mt-4 leading-7 text-white/70" },
          "Worldwide",
          e("br"),
          "rotaryeclubofconnectedminds@gmail.com",
          e("br"),
          "+234 806 862 3066",
          e("br"),
          "+234 803 467 6789",
          e("br"),
          "+234 806 977 6381",
          e("br"),
          "+234 806 862 3066"
        )
      ),
      e(
        "div",
        null,
        e("h3", { className: "font-black" }, "Explore"),
        e(
          "div",
          { className: "mt-4 grid gap-2" },
          navItems.slice(1).map(([label, id]) =>
            e(
              "a",
              {
                key: id,
                href: `#${id}`,
                className: "text-white/70 hover:text-white",
              },
              label
            )
          )
        )
      )
    ),
    e(
      "div",
      {
        className:
          "mx-auto mt-10 max-w-7xl border-t border-white/10 pt-6 text-sm text-white/55",
      },
      `Copyright ${new Date().getFullYear()} Rotary eClub Of Connected Minds. Designed and built by Oluwatimilehin Rotimi.`
    )
  );
}

function ScrollTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 650);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return e(
    "button",
    {
      className: `fixed bottom-5 right-5 z-40 grid h-12 w-12 place-items-center rounded-full bg-[#f7a81b] text-rotary-ink shadow-soft transition ${
        show ? "opacity-100" : "pointer-events-none opacity-0"
      }`,
      onClick: () => window.scrollTo({ top: 0, behavior: "smooth" }),
      "aria-label": "Scroll to top",
    },
    Icon({ name: "top" })
  );
}

function App() {
  const jsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "NGO",
      name: "Rotary Club New Charter",
      url: window.location.href,
      areaServed: "Bida, Nigeria",
      slogan: "Service Above Self",
    }),
    []
  );

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(jsonLd);
    document.head.appendChild(script);
    return () => script.remove();
  }, [jsonLd]);

  return e(
    React.Fragment,
    null,
    e(Navbar),
    e(
      "main",
      null,
      e(Hero),
      e(About),
      e(Team),
      e(Projects),
      e(Events),
      e(Membership),
      e(Stories)
    ),
    e(Footer),
    e(ScrollTop)
  );
}

createRoot(document.getElementById("root")).render(e(App));
