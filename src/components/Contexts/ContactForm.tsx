'use client';

// Imports
// ------------
import { createContext, useState } from 'react';

// Interfaces + Types
// ------------
export type RouteKey = 'general' | 'project' | 'career' | 'other';

export type ContactPayload = {
	// General Fields
	name: string;
	helpType: RouteKey;
	email: string;
	phone?: string;

	// Branched Fields - Project
	projectDetails: string;
	projectStage: string; // Where are you at right now
	projectBudget: string;
	projectTimeline: string;
	projectAdditional: string;

	// Branched Fields - Career
	careerRoleType: string; // Contract or Full-Time
	careerDayrate: string; // For Contract
	careerSalaryRange: string; // For Full-Time
	careerLevel: string;
	careerInfo: string;
	careerDeadline: string;

	// Branched Fields - Other
	otherDetails: string;
};

interface FormContextType {
	formData: ContactPayload;
	setFormData: (data: ContactPayload) => void;
	resetFormData: () => void;
	currentStep: number;
	setCurrentStep: (step: number) => void;
}

// Constants
// ------------
const initialFormData: ContactPayload = {
	// General Fields
	name: '',
	email: '',
	phone: '',
	helpType: 'general',

	// Project Fields
	projectDetails: '',
	projectStage: '',
	projectBudget: '',
	projectTimeline: '',
	projectAdditional: '',

	// Career Fields
	careerRoleType: '',
	careerDayrate: '',
	careerSalaryRange: '',
	careerLevel: '',
	careerInfo: '',
	careerDeadline: '',

	// Other Fields
	otherDetails: '',
};

// Exports
// ------------
export const FormContext = createContext<FormContextType>({
	formData: initialFormData,
	setFormData: () => {},
	resetFormData: () => {},
	currentStep: 0,
	setCurrentStep: () => {},
});

export const FormProvider = ({ children }: { children: React.ReactNode }) => {
	const [formData, setFormData] = useState<ContactPayload>(initialFormData);
	const [currentStep, setCurrentStep] = useState<number>(0);

	// Reset form data to initial state
	const resetFormData = () => {
		setFormData(initialFormData);
		setCurrentStep(0);
	};

	return (
		<FormContext.Provider
			value={{
				formData,
				setFormData,
				resetFormData,
				currentStep,
				setCurrentStep,
			}}
		>
			{children}
		</FormContext.Provider>
	);
};
