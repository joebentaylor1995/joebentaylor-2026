// Imports
// ------------
import { ContactPayload, RouteKey } from '@parts/Contexts/ContactForm';

// Interfaces + Types
// ------------
export interface RadioOption {
	value: string; // Can be RouteKey for helpType, or any other string for other questions
	label: string;
}

export interface FormQuestion {
	statement?: string; // Optional statement before the question
	question: string; // The question to ask
	key: keyof ContactPayload; // Where to store the answer in formData
	inputType?: 'text' | 'email' | 'tel'; // Input type (defaults to 'text')
	placeholder?: string; // Placeholder text
	validation?: (value: string) => boolean; // Optional validation function
	radioOptions?: RadioOption[]; // Radio button options (if provided, renders radios instead of input)
	conditionalNext?: (answer: string) => RouteKey | null; // Returns which route to follow based on answer
	isFinal?: boolean; // If true, this is the last question before submission
}

// Base Questions (before routing)
// ------------
const baseQuestions: FormQuestion[] = [
	{
		question: "What's your name?",
		key: 'name',
		inputType: 'text',
		placeholder: 'Type your name',
	},
	{
		statement: 'Great to meet you, {name}',
		question: 'How can I help today?',
		key: 'helpType',
		radioOptions: [
			{ value: 'project', label: 'Hire for a project' },
			{ value: 'career', label: 'Job or contract opportunity' },
			{ value: 'other', label: 'Something else' },
		],
		conditionalNext: (answer: string) => answer as RouteKey,
	},
	{
		statement:
			'Nice one, {name}. Before we dive in, I need to grab a couple details so I can reply properly.',
		question: "What's your email address?",
		key: 'email',
		inputType: 'email',
		placeholder: 'Type your email',
	},
	{
		question: 'And your phone number?',
		key: 'phone',
		inputType: 'tel',
		placeholder: 'Type your phone number',
	},
];

// Route-specific Questions - Project
// ------------
const projectQuestions: FormQuestion[] = [
	{
		question:
			'Awesome. Tell me a little about the project you have in mind.',
		key: 'projectDetails',
		inputType: 'text',
		placeholder: 'Describe your project',
	},
	{
		statement: 'Sounds great, {name}!',
		question: 'Where are you at right now?',
		key: 'projectStage',
		radioOptions: [
			{ value: 'just-exploring', label: 'Just exploring ideas' },
			{ value: 'getting-quotes', label: 'Getting quotes' },
			{ value: 'ready-to-go', label: 'Ready to go' },
		],
	},
	{
		question: 'What kind of budget are you thinking about?',
		key: 'projectBudget',
		radioOptions: [
			{ value: 'under-3k', label: 'Under £3k' },
			{ value: '3k-10k', label: '£3k - £10k' },
			{ value: '10k-25k', label: '£10k - £25k' },
			{ value: '25k-plus', label: '£25k+' },
			{ value: 'not-sure', label: "I'm not sure" },
		],
	},
	{
		question: 'When would you like to have this completed?',
		key: 'projectTimeline',
		radioOptions: [
			{ value: 'asap', label: 'ASAP (0–4 weeks)' },
			{ value: 'soon', label: 'Soon (1–3 months)' },
			{ value: 'no-deadline', label: 'No strict deadline' },
		],
	},
	{
		question: 'Is there anything else you want to share, {name}?',
		key: 'projectAdditional',
		inputType: 'text',
		placeholder: 'Type any additional details',
	},
	{
		statement:
			"Thanks for sending everything over, {name}. I'll review it and get back to you.",
		question: '',
		key: 'email' as keyof ContactPayload, // Dummy key, won't be used
		isFinal: true,
	},
	{
		statement:
			'Please expect a response within the coming days. If this is super urgent please email or call me directly.',
		question: '',
		key: 'email' as keyof ContactPayload, // Dummy key, won't be used
		isFinal: true,
	},
];

// Route-specific Questions - Career
// ------------
const careerQuestions: FormQuestion[] = [
	{
		statement: "Nice, let's talk work opportunities.",
		question: 'What type of role are you looking to fill?',
		key: 'careerRoleType',
		radioOptions: [
			{ value: 'contract', label: 'Contract' },
			{ value: 'full-time', label: 'Full-Time' },
		],
	},
	// Contract path - day rate question
	{
		question:
			'What kind of day rate are you budgeting for this role per day?',
		key: 'careerDayrate',
		radioOptions: [
			{ value: '400', label: '£400' },
			{ value: '400-550', label: '£400-£550' },
			{ value: '550-plus', label: '£550+' },
			{ value: 'not-sure', label: "I'm not sure" },
		],
		// This will be conditionally shown based on careerRoleType === 'contract'
	},
	// Full-Time path - salary range question
	{
		question: 'What salary range are you considering for this role?',
		key: 'careerSalaryRange',
		radioOptions: [
			{ value: '90k-110k', label: '£90k-£110k' },
			{ value: '110k-140k', label: '£110k-£140k' },
			{ value: '140k-plus', label: '£140k+' },
			{ value: 'not-sure', label: 'Not sure / open to discussion' },
		],
		// This will be conditionally shown based on careerRoleType === 'full-time'
	},
	{
		statement: 'No worries, {name}.',
		question: 'Do you have a rough level in mind for the role?',
		key: 'careerLevel',
		radioOptions: [
			{ value: 'senior', label: 'Senior' },
			{ value: 'mid-senior', label: 'Mid-Senior' },
			{ value: 'lead', label: 'Lead' },
			{ value: 'director', label: 'Director' },
		],
	},
	{
		statement: 'Awesome.',
		question: 'Next up. Can you share a little info about the position?',
		key: 'careerInfo',
		inputType: 'text',
		placeholder: 'Type information about the position',
	},
	{
		statement: 'Thanks for this, {name}.',
		question: 'When are you hoping to fill this role?',
		key: 'careerDeadline',
		radioOptions: [
			{ value: 'right-away', label: 'Right away' },
			{ value: 'within-month', label: 'Within a month' },
			{ value: 'flexible', label: 'Flexible' },
		],
	},
	{
		statement:
			"Thanks for sending everything over, {name}. I'll review it and get back to you.",
		question: '',
		key: 'email' as keyof ContactPayload, // Dummy key, won't be used
		isFinal: true,
	},
	{
		statement:
			'Please expect a response within the coming days. If this is super urgent please email or call me directly.',
		question: '',
		key: 'email' as keyof ContactPayload, // Dummy key, won't be used
		isFinal: true,
	},
];

// Route-specific Questions - Other
// ------------
const otherQuestions: FormQuestion[] = [
	{
		statement: 'Thanks for this, {name}.',
		question: 'Now, what are you reaching out about?',
		key: 'otherDetails',
		inputType: 'text',
		placeholder: 'Type your details',
	},
	{
		statement:
			"Thanks for sending everything over, {name}. I'll review it and get back to you.",
		question: '',
		key: 'email' as keyof ContactPayload, // Dummy key, won't be used
		isFinal: true,
	},
	{
		statement:
			'Please expect a response within the coming days. If this is super urgent please email or call me directly.',
		question: '',
		key: 'email' as keyof ContactPayload, // Dummy key, won't be used
		isFinal: true,
	},
];

// Helper function to get questions based on route
// ------------
export function getQuestions(
	helpType?: RouteKey,
	formData?: ContactPayload
): FormQuestion[] {
	const questions = [...baseQuestions];

	if (helpType && helpType !== 'general') {
		switch (helpType) {
			case 'project':
				questions.push(...projectQuestions);
				break;
			case 'career':
				// For career, we need to conditionally show day rate or salary based on careerRoleType
				questions.push(...careerQuestions);
				break;
			case 'other':
				questions.push(...otherQuestions);
				break;
		}
	}

	return questions;
}

// Helper function to filter questions based on conditional logic
// This is used for career questions that depend on careerRoleType
export function shouldShowQuestion(
	question: FormQuestion,
	formData: ContactPayload,
	currentStep: number,
	allQuestions: FormQuestion[]
): boolean {
	// For career questions, we need to handle conditional routing
	if (formData.helpType === 'career') {
		// Find the careerRoleType question index
		const roleTypeIndex = allQuestions.findIndex(
			q => q.key === 'careerRoleType'
		);

		// If this is the day rate question
		if (question.key === 'careerDayrate') {
			// Only show if roleType is 'contract' and we've answered the roleType question
			return formData.careerRoleType === 'contract';
		}

		// If this is the salary range question
		if (question.key === 'careerSalaryRange') {
			// Only show if roleType is 'full-time' and we've answered the roleType question
			return formData.careerRoleType === 'full-time';
		}
	}

	return true;
}

// Export base questions for initial state
export const questions = baseQuestions;
