module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "background-image": "url('/public/task-website-background.jpg')",
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), "flowbite/plugin"],
};
