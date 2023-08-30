import type {Config} from "tailwindcss"

// Screen sizes
const mobile = "450px"
const laptop = "1024px"
const desktop = "1280px"
const xsm = mobile
const sm = "640px"
const md = "768px"
const lg = laptop
const xl = desktop
const xl2 = "1536px"

export default {
  content: ["*.vue", "*.tsx"],
  theme: {
    extend: {
      width: {
        laptop,
        mobile,
        desktop
      },
      maxWidth: {
        laptop,
        mobile,
        desktop
      }
    },
    screens: {
      mobile,
      laptop,
      desktop,
      xsm,
      sm,
      md,
      lg,
      xl,
      "2xl": xl2
    }
  }
} satisfies Config
