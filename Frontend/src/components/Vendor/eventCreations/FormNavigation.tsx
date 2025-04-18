import React from "react";
import { Button } from "@/components/ui/button";

interface FormNavigationProps {
  currentStep: number;
  steps: { id: string; label: string }[];
  prevStep: () => void;
  nextStep: () => void;
  isSubmitting: boolean;
  onSubmit: () => void
}

const FormNavigation: React.FC<FormNavigationProps> = ({
  currentStep,
  steps,
  prevStep,
  nextStep,
  isSubmitting,
  onSubmit
}) => {

  return (
    <div className="flex justify-between mt-6">
      {currentStep > 0 && (
        <Button
          type="button"
          variant="outline"
          onClick={prevStep}
        >
          Previous
        </Button>
      )}

      {currentStep < steps.length - 1 ? (
        <Button
          type="button"
          className="bg-purple-600 hover:bg-purple-700 ml-auto"
          onClick={nextStep}
        >
          Next
        </Button>
      ) : (
        <Button
          type="button"
          onClick={onSubmit}
          className="bg-purple-600 hover:bg-purple-700 ml-auto"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating..." : "Create Event"}
        </Button>
      )}
    </div>
  );
};

export default React.memo(FormNavigation);