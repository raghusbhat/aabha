import React from "react";
import { Button } from "../button";
import {
  Mail,
  ArrowRight,
  Plus,
  Download,
  Heart,
  Settings,
  ExternalLink,
  Trash,
} from "lucide-react";
import { CodeBlock } from "../CodeBlock";
import { AlertDialogPreview } from "./AlertDialogPreview";

interface PreviewProps {
  component: string;
}

export const ComponentPreview: React.FC<PreviewProps> = ({ component }) => {
  const buttonCode = `import { Button } from './components/Button';
import { Mail, ArrowRight, Settings } from 'lucide-react';

// Basic variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>
<Button variant="success">Success</Button>

// With icons (animated by default)
<Button variant="primary" icon={Mail}>
  Email
</Button>

// With non-animated icons
<Button variant="outline" icon={ArrowRight} animated={false}>
  Next
</Button>

// Icon position
<Button variant="ghost" icon={Settings} iconPosition="right">
  Settings
</Button>

// Sizes
<Button size="xs">XS</Button>
<Button size="sm">SM</Button>
<Button size="md">MD</Button>
<Button size="lg">LG</Button>
<Button size="xl">XL</Button>

// Rounded corners
<Button rounded="none">Square</Button>
<Button rounded="sm">Small</Button>
<Button rounded="md">Medium</Button>
<Button rounded="lg">Large</Button>
<Button rounded="full">Pill</Button>

// Disabled state
<Button variant="primary" disabled>Disabled</Button>`;

  const renderButtonPreviews = () => (
    <div className="space-y-12">
      <section>
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          Button Variants
        </h3>
        <div className="flex flex-wrap gap-4 items-center">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="success">Success</Button>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          Button Sizes
        </h3>
        <div className="flex flex-wrap gap-4 items-center">
          <Button size="xs">XS</Button>
          <Button size="sm">SM</Button>
          <Button size="md">MD</Button>
          <Button size="lg">LG</Button>
          <Button size="xl">XL</Button>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          Button Shapes
        </h3>
        <div className="flex flex-wrap gap-4 items-center">
          <Button rounded="none">Square</Button>
          <Button rounded="sm">Small</Button>
          <Button rounded="md">Medium</Button>
          <Button rounded="lg">Large</Button>
          <Button size="xs" rounded="full">
            Pill
          </Button>
          <div className="bg-primary-500 text-xs rounded-xl px-2 py-0.5">
            test
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          With Animated Icons (hover over button)
        </h3>
        <div className="flex flex-wrap gap-4 items-center">
          <Button variant="primary" icon={Mail}>
            Email
          </Button>
          <Button variant="outline" icon={ArrowRight} iconPosition="right">
            Next
          </Button>
          <Button variant="ghost" icon={Settings}>
            Settings
          </Button>
          <Button variant="success" icon={Plus} size="sm">
            Add
          </Button>
          <Button variant="danger" icon={Trash} size="xs">
            Delete
          </Button>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          With Non-Animated Icons
        </h3>
        <div className="flex flex-wrap gap-4 items-center">
          <Button variant="primary" icon={Heart} animated={false}>
            Like
          </Button>
          <Button
            variant="outline"
            icon={ExternalLink}
            iconPosition="right"
            animated={false}
          >
            Visit
          </Button>
          <Button
            variant="secondary"
            icon={Download}
            animated={false}
            size="lg"
          >
            Download
          </Button>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          Disabled State
        </h3>
        <div className="flex flex-wrap gap-4 items-center">
          <Button variant="primary" disabled>
            Disabled
          </Button>
          <Button variant="outline" disabled icon={Mail}>
            Disabled
          </Button>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          Code Example
        </h3>
        <CodeBlock code={buttonCode} showLineNumbers={true} />
      </section>
    </div>
  );

  const renderPreview = () => {
    switch (component) {
      case "button":
        return renderButtonPreviews();
      case "alertdialog":
        return <AlertDialogPreview />;
      default:
        return <div>Select a component to view its preview</div>;
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white capitalize">
        {component || "Component"} Preview
      </h2>
      {renderPreview()}
    </div>
  );
};
