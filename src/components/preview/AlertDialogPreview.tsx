import React, { useState } from "react";
import { AlertDialog } from "../AlertDialog";
import { Button } from "../button";
import { CodeBlock } from "../CodeBlock";

export const AlertDialogPreview: React.FC = () => {
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isWarningOpen, setIsWarningOpen] = useState(false);
  const [isDangerOpen, setIsDangerOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isCustomOpen, setIsCustomOpen] = useState(false);

  const basicCode = `import { AlertDialog } from './components/AlertDialog';
import { Button } from './components/Button';

// Basic usage
<AlertDialog
  title="Delete Account"
  description="Are you sure you want to delete your account? This action cannot be undone."
  trigger={<Button variant="danger">Delete Account</Button>}
  onConfirm={() => console.log('Account deleted')}
/>

// With custom buttons
<AlertDialog
  title="Save Changes"
  description="Do you want to save your changes?"
  trigger={<Button variant="primary">Save</Button>}
  confirmText="Save Changes"
  cancelText="Discard"
  onConfirm={() => console.log('Changes saved')}
/>

// With loading state
<AlertDialog
  title="Processing"
  description="Please wait while we process your request..."
  trigger={<Button variant="primary">Process</Button>}
  isLoading={true}
  onConfirm={() => {}}
/>`;

  return (
    <div className="space-y-12">
      <section>
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          Basic Alert Dialog
        </h3>
        <div className="flex flex-wrap gap-4">
          <AlertDialog
            title="Delete Account"
            description="Are you sure you want to delete your account? This action cannot be undone."
            trigger={<Button variant="danger">Delete Account</Button>}
            onConfirm={() => console.log("Account deleted")}
          />
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          Custom Button Text
        </h3>
        <div className="flex flex-wrap gap-4">
          <AlertDialog
            title="Save Changes"
            description="Do you want to save your changes?"
            trigger={<Button variant="primary">Save</Button>}
            confirmText="Save Changes"
            cancelText="Discard"
            onConfirm={() => console.log("Changes saved")}
          />
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          Loading State
        </h3>
        <div className="flex flex-wrap gap-4">
          <AlertDialog
            title="Processing"
            description="Please wait while we process your request..."
            trigger={<Button variant="primary">Process</Button>}
            isLoading={true}
            onConfirm={() => {}}
          />
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          Code Example
        </h3>
        <CodeBlock code={basicCode} language="tsx" showLineNumbers={true} />
      </section>
    </div>
  );
};
