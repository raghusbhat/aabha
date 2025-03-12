import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { LandingPage } from "./components/LandingPage";
import { ComponentPreview } from "./components/preview/ComponentPreview";

// Root layout that includes the common Layout component
const RootLayout = ({
  isDarkMode,
  onThemeToggle,
}: {
  isDarkMode: boolean;
  onThemeToggle: () => void;
}) => {
  console.log("RootLayout rendering with isDarkMode:", isDarkMode);
  return (
    <Layout isDarkMode={isDarkMode} onThemeToggle={onThemeToggle}>
      <Outlet />
    </Layout>
  );
};

// Create router with all routes
export const createAppRouter = (
  isDarkMode: boolean,
  onThemeToggle: () => void
) => {
  console.log("Creating router with isDarkMode:", isDarkMode);

  // Create a unique key for the router based on the theme state
  // This forces a re-render when the theme changes
  const routerKey = `router-${isDarkMode ? "dark" : "light"}`;

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <RootLayout
          key={`root-layout-${isDarkMode ? "dark" : "light"}`}
          isDarkMode={isDarkMode}
          onThemeToggle={onThemeToggle}
        />
      ),
      children: [
        {
          index: true,
          element: (
            <LandingPage
              key={`landing-page-${isDarkMode ? "dark" : "light"}`}
              isDarkMode={isDarkMode}
              onThemeToggle={onThemeToggle}
            />
          ),
        },
        {
          path: "components",
          children: [
            {
              path: "button",
              element: <ComponentPreview component="button" />,
            },
            {
              path: "alertdialog",
              element: <ComponentPreview component="alertdialog" />,
            },
            // Add more component routes here as they are created
          ],
        },
      ],
    },
  ]);

  return <RouterProvider key={routerKey} router={router} />;
};
