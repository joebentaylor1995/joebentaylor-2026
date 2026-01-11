'use client';

// Imports
// ------------
import ActionBar from './ActionBar';
import Message, { clearAnimatedMessages } from './Message';
import React, { use, useRef, useEffect, useState } from 'react';
import { FormContext, ContactPayload } from '@parts/Contexts/ContactForm';
import { GlobalContext } from '@parts/Contexts';
import { getQuestions, shouldShowQuestion, FormQuestion } from './questions';
import { RouteKey } from '@parts/Contexts/ContactForm';
import { gsap } from 'gsap';

// Styles + Interfaces
// ------------
import * as I from './interface';
import * as S from './styles';

// Component
// ------------
const Form = ({}: I.FormProps) => {
	// Contexts
	const { contactOpen } = use(GlobalContext);
	const {
		formData,
		setFormData,
		resetFormData,
		currentStep,
		setCurrentStep,
	} = use(FormContext);

	// State
	const [currentInputValue, setCurrentInputValue] = useState<string>('');
	const [selectedRadioValue, setSelectedRadioValue] = useState<string>('');
	const [answeredQuestions, setAnsweredQuestions] = useState<
		Array<{ question: FormQuestion; answer: string }>
	>([]);
	const [resetKey, setResetKey] = useState<number>(0);

	// Refs
	const inputRef = useRef<HTMLInputElement>(null);
	const finalStatementTimeoutRef = useRef<NodeJS.Timeout | null>(null);

	// Get questions dynamically based on helpType
	// Note: helpType should be set by step 1 (radio selection)
	// IMPORTANT: Use 'general' as fallback, but if helpType exists, use it
	const helpType = formData.helpType || ('general' as RouteKey);
	const allQuestions = getQuestions(helpType, formData);

	// Filter questions based on conditional logic (e.g., contract vs full-time for career)
	const questions = allQuestions.filter((q, index) =>
		shouldShowQuestion(q, formData, index, allQuestions)
	);

	// Ensure currentStep is within bounds
	// After phone (step 3), we move to route-specific questions (step 4+)
	const safeCurrentStep = Math.max(
		0,
		Math.min(currentStep, questions.length - 1)
	);
	const currentQuestion: FormQuestion | undefined =
		questions[safeCurrentStep];

	// Cleanup timeout on unmount
	useEffect(() => {
		return () => {
			if (finalStatementTimeoutRef.current) {
				clearTimeout(finalStatementTimeoutRef.current);
				finalStatementTimeoutRef.current = null;
			}
		};
	}, []);

	// Reset form when modal closes (after animation completes)
	useEffect(() => {
		if (!contactOpen) {
			// Clear any pending final statement timeout
			if (finalStatementTimeoutRef.current) {
				clearTimeout(finalStatementTimeoutRef.current);
				finalStatementTimeoutRef.current = null;
			}

			// Wait for modal close animation to finish (1s duration)
			const timeoutId = setTimeout(() => {
				setCurrentInputValue('');
				setSelectedRadioValue('');
				setAnsweredQuestions([]);
				// Reset form data to initial state (includes currentStep)
				resetFormData();
				// Clear animated messages so they animate again when form reopens
				clearAnimatedMessages();
			}, 1000); // Match modal animation duration

			return () => clearTimeout(timeoutId);
		}
	}, [contactOpen, resetFormData]);

	// Smooth scroll chatlog when new messages are added (only if user is at bottom)
	useEffect(() => {
		if (!contactOpen) return;

		// Scroll to bottom smoothly when new messages are added, but only if user is already near bottom
		const timeoutId = setTimeout(() => {
			const chatlog = document.querySelector(
				'[data-chatlog]'
			) as HTMLElement;
			if (chatlog) {
				// Check if user is near the bottom (within 100px)
				const isNearBottom =
					chatlog.scrollHeight -
						chatlog.scrollTop -
						chatlog.clientHeight <
					100;

				// Only auto-scroll if user is at/near bottom (following conversation)
				if (isNearBottom) {
					gsap.to(chatlog, {
						scrollTop: chatlog.scrollHeight,
						duration: 0.4,
						ease: 'power2.out',
					});
				}
			}
		}, 50);

		return () => clearTimeout(timeoutId);
	}, [answeredQuestions, currentQuestion, contactOpen]);

	// Auto-focus input when modal opens or step changes
	useEffect(() => {
		if (contactOpen && currentQuestion) {
			// Handle radio questions
			if (currentQuestion.radioOptions) {
				const existingValue = formData[currentQuestion.key];
				if (existingValue && typeof existingValue === 'string') {
					setSelectedRadioValue(existingValue);
				} else {
					setSelectedRadioValue('');
				}
				setCurrentInputValue('');
			} else {
				// Handle text input questions
				const timeoutId = setTimeout(() => {
					if (inputRef.current) {
						inputRef.current.focus();
						const existingValue = formData[currentQuestion.key];
						if (
							existingValue &&
							typeof existingValue === 'string'
						) {
							setCurrentInputValue(existingValue);
							inputRef.current.value = existingValue;
						} else {
							setCurrentInputValue('');
							inputRef.current.value = '';
						}
					}
				}, 100);

				return () => clearTimeout(timeoutId);
			}
		}
	}, [contactOpen, currentStep, currentQuestion, formData]);

	// Helper: Calculate next step based on current question and updated questions
	const calculateNextStep = (
		currentQuestion: FormQuestion,
		currentStep: number,
		updatedQuestions: FormQuestion[],
		value: string
	): number => {
		const currentQuestionIndex = updatedQuestions.findIndex(
			q => q.key === currentQuestion.key
		);

		let nextStep =
			currentQuestionIndex !== -1
				? currentQuestionIndex + 1
				: currentStep + 1;

		// Handle conditional routing (e.g., helpType -> route selection)
		if (currentQuestion.conditionalNext) {
			const route = currentQuestion.conditionalNext(value);
			if (route && currentQuestionIndex !== -1) {
				nextStep = currentQuestionIndex + 1;
			}
		}

		// Special case: After phone question, always go to step 4 (first route question)
		if (currentQuestion.key === 'phone') {
			nextStep = 4;
		}

		return Math.max(0, Math.min(nextStep, updatedQuestions.length));
	};

	// Helper: Handle final statements (auto-advance through them)
	const handleFinalStatements = (
		nextStep: number,
		updatedQuestions: FormQuestion[]
	) => {
		const nextQuestion = updatedQuestions[nextStep];
		if (!nextQuestion?.isFinal || nextQuestion.question) return false;

		// Clear any existing timeout before setting a new one
		if (finalStatementTimeoutRef.current) {
			clearTimeout(finalStatementTimeoutRef.current);
			finalStatementTimeoutRef.current = null;
		}

		// Add first final statement
		setAnsweredQuestions(prev => [
			...prev,
			{ question: nextQuestion, answer: '' },
		]);

		// Auto-advance to second final statement after delay
		finalStatementTimeoutRef.current = setTimeout(() => {
			if (nextStep + 1 < updatedQuestions.length) {
				const nextFinalQuestion = updatedQuestions[nextStep + 1];
				if (nextFinalQuestion?.isFinal && !nextFinalQuestion.question) {
					setAnsweredQuestions(prev => [
						...prev,
						{ question: nextFinalQuestion, answer: '' },
					]);
				} else {
					setCurrentStep(nextStep + 1);
				}
			}
			finalStatementTimeoutRef.current = null;
		}, 2000);

		setCurrentStep(nextStep);
		return true;
	};

	// Helper: Process answer and advance to next step
	const processAnswer = (
		value: string,
		displayAnswer: string,
		currentQuestion: FormQuestion,
		newFormData: ContactPayload
	) => {
		setFormData(newFormData);
		setAnsweredQuestions(prev => [
			...prev,
			{ question: currentQuestion, answer: displayAnswer },
		]);

		// Get updated questions based on new formData
		const updatedAllQuestions = getQuestions(
			newFormData.helpType as RouteKey,
			newFormData
		);
		const updatedQuestions = updatedAllQuestions.filter((q, index) =>
			shouldShowQuestion(q, newFormData, index, updatedAllQuestions)
		);

		// Validate helpType is set before proceeding to route questions
		if (currentQuestion.key === 'phone') {
			const helpTypeValue = newFormData.helpType || formData.helpType;
			if (!helpTypeValue || helpTypeValue === 'general') {
				return; // Don't proceed if helpType isn't set
			}
			newFormData.helpType = helpTypeValue;
		}

		const nextStep = calculateNextStep(
			currentQuestion,
			currentStep,
			updatedQuestions,
			value
		);

		// Handle final statements or advance to next question
		if (nextStep < updatedQuestions.length) {
			if (!handleFinalStatements(nextStep, updatedQuestions)) {
				setCurrentStep(nextStep);
				setCurrentInputValue('');
				setSelectedRadioValue('');
			}
		}
	};

	// Handle input change
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCurrentInputValue(e.target.value);
	};

	// Handle radio change - automatically submit when radio is selected
	const handleRadioChange = (value: string) => {
		if (!currentQuestion?.radioOptions) return;

		setSelectedRadioValue(value);

		const newFormData = {
			...formData,
			[currentQuestion.key]: value,
		} as ContactPayload;

		const displayAnswer =
			currentQuestion.radioOptions.find(opt => opt.value === value)
				?.label || value;

		processAnswer(value, displayAnswer, currentQuestion, newFormData);
	};

	// Handle submit
	const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		if (!currentQuestion) return;

		// Determine value based on question type
		const value = currentQuestion.radioOptions
			? selectedRadioValue
			: currentInputValue.trim();

		// Validation
		if (!value) return;
		if (currentQuestion.validation && !currentQuestion.validation(value)) {
			return;
		}

		// Get display answer (label for radio, value for text)
		const displayAnswer = currentQuestion.radioOptions
			? currentQuestion.radioOptions.find(opt => opt.value === value)
					?.label || value
			: value;

		const newFormData = {
			...formData,
			[currentQuestion.key]: value,
		} as ContactPayload;

		processAnswer(value, displayAnswer, currentQuestion, newFormData);
	};

	// Format text with dynamic values (e.g., {name})
	const formatText = (text: string): string => {
		return text.replace(/{(\w+)}/g, (match, key) => {
			const value = formData[key as keyof ContactPayload];
			return typeof value === 'string' ? value : match;
		});
	};

	return (
		<S.Jacket>
			<S.Chatlog key={resetKey} data-chatlog>
				{/* Display all previous robot messages */}
				{(() => {
					const items: React.ReactNode[] = [];
					let i = 0;

					while (i < answeredQuestions.length) {
						const current = answeredQuestions[i];
						const question = current.question;

						// Check if this is a final statement and if the next one is also a final statement
						const isFinalStatement =
							question.isFinal && !question.question;
						const nextIsFinalStatement =
							i + 1 < answeredQuestions.length &&
							answeredQuestions[i + 1].question.isFinal &&
							!answeredQuestions[i + 1].question.question;

						// If both are final statements, group them together
						if (isFinalStatement && nextIsFinalStatement) {
							const next = answeredQuestions[i + 1];
							const messageKey = `robot-answered-${i}-group`;
							items.push(
								<React.Fragment key={`conversation-group-${i}`}>
									<Message
										type='robot'
										messageKey={messageKey}
										delay={0.25 + i * 0.1}
									>
										{question.statement && (
											<S.Statement data-statement>
												{formatText(question.statement)}
											</S.Statement>
										)}
										{next.question.statement && (
											<S.Statement data-statement>
												{formatText(
													next.question.statement
												)}
											</S.Statement>
										)}
									</Message>
								</React.Fragment>
							);
							i += 2; // Skip both since we've handled them
						} else {
							// Normal rendering
							const robotMessageKey = `robot-answered-${i}`;
							const userMessageKey = `user-answered-${i}`;
							items.push(
								<React.Fragment key={`conversation-${i}`}>
									<Message
										type='robot'
										messageKey={robotMessageKey}
										delay={0.25 + i * 0.1}
									>
										{question.statement && (
											<S.Statement data-statement>
												{formatText(question.statement)}
											</S.Statement>
										)}
										{question.question && (
											<S.Question data-question>
												{formatText(question.question)}
											</S.Question>
										)}
									</Message>
									{/* Only show user answer if it exists (final statements don't have answers) */}
									{current.answer && (
										<Message
											type='user'
											messageKey={userMessageKey}
											delay={i * 0.1 + 0.15}
										>
											<S.Answer>
												{current.answer}
											</S.Answer>
										</Message>
									)}
								</React.Fragment>
							);
							i++;
						}
					}

					return items;
				})()}

				{/* Display current statement and question */}
				{/* Only show current question if it's not a final statement (final statements are already in answeredQuestions) */}
				{!(currentQuestion.isFinal && !currentQuestion.question) && (
					<Message
						type='robot'
						messageKey={`robot-current-${currentStep}-${currentQuestion.key}`}
						delay={0.25 + answeredQuestions.length * 0.1}
					>
						{currentQuestion.statement && (
							<S.Statement data-statement>
								{formatText(currentQuestion.statement)}
							</S.Statement>
						)}
						{currentQuestion.question && (
							<S.Question data-question>
								{formatText(currentQuestion.question)}
							</S.Question>
						)}
					</Message>
				)}
			</S.Chatlog>

			{/* Show ActionBar - either for questions or reset button when finished */}
			<ActionBar
				ref={inputRef}
				value={currentInputValue}
				onChange={handleInputChange}
				onRadioChange={handleRadioChange}
				onSubmit={handleSubmit}
				placeholder={currentQuestion.placeholder || 'Type to respond'}
				inputType={currentQuestion.inputType || 'text'}
				isDisabled={
					currentQuestion.radioOptions
						? true // Disable button for radio questions (auto-submits on selection)
						: !currentInputValue.trim()
				}
				radioOptions={currentQuestion.radioOptions}
				selectedRadio={selectedRadioValue}
				isFinished={
					currentQuestion.isFinal && !currentQuestion.question
				}
				onReset={() => {
					// Clear animated messages first
					clearAnimatedMessages();
					// Clear local state BEFORE resetting form data
					setAnsweredQuestions([]);
					setCurrentInputValue('');
					setSelectedRadioValue('');
					// Reset form data (updates context)
					resetFormData();
					// Force complete remount AFTER state is cleared
					// Use setTimeout to ensure state updates are processed first
					setTimeout(() => {
						setResetKey(prev => prev + 1);
					}, 0);
				}}
			/>
		</S.Jacket>
	);
};

// Exports
// ------------
Form.displayName = 'Form';
export default Form;
