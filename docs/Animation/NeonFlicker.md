# Neon Flicker Animation Utility

A reusable utility function that creates a broken neon light flicker effect for animating text or elements. Perfect for creating dramatic, glitchy text reveals.

## Overview

The `animateNeonFlicker` function creates a realistic broken neon light effect where elements flicker randomly before settling at full opacity. Each element gets its own random flicker pattern, creating an organic, non-uniform animation.

## Installation

The utility is located at `@utils/animateNeonFlicker` and can be imported directly:

```typescript
import { animateNeonFlicker } from '@utils/animateNeonFlicker';
```

## Basic Usage

### With SplitText Characters

The most common use case is animating text split into characters:

```tsx
import { animateNeonFlicker } from '@utils/animateNeonFlicker';
import SplitText from 'gsap/SplitText';
import { gsap } from 'gsap';

// Split text into characters
const split = SplitText.create(headingElement, {
	type: 'chars',
	charsClass: 'char++',
});

// Create timeline and animate
const tl = gsap.timeline({ delay: 0.5 });
animateNeonFlicker(split.chars, tl);
```

### With Regular Elements

You can also animate any array of elements:

```tsx
const elements = document.querySelectorAll('.flicker-item');
const tl = gsap.timeline();
animateNeonFlicker(elements, tl);
```

### Without Parent Timeline

If you don't provide a timeline, a new one is created:

```tsx
const timeline = animateNeonFlicker(split.chars);
// Use the returned timeline
timeline.play();
```

## Configuration Options

All options are optional and have sensible defaults:

```typescript
interface NeonFlickerOptions {
	maxDelay?: number; // Max random delay (0-0.4s default)
	minFlickers?: number; // Min flickers per element (2 default)
	maxFlickers?: number; // Max flickers per element (5 default)
	minFlickerDuration?: number; // Min flicker speed (0.02s default)
	maxFlickerDuration?: number; // Max flicker speed (0.05s default)
	minFlickerOpacity?: number; // Min opacity during flicker (0.3 default)
	maxFlickerOpacity?: number; // Max opacity during flicker (0.8 default)
	finalFadeDuration?: number; // Final fade duration (0.2s default)
	finalFadeEase?: string; // Final fade easing ('power2.out' default)
	timelinePosition?: number | string; // Position in timeline (0 default)
}
```

### Example: Custom Configuration

```tsx
animateNeonFlicker(split.chars, tl, {
	maxDelay: 0.6, // Longer random delays
	minFlickers: 3, // More flickers
	maxFlickers: 7, // Up to 7 flickers
	minFlickerOpacity: 0.2, // Darker flickers
	maxFlickerOpacity: 0.9, // Brighter flickers
	finalFadeDuration: 0.4, // Slower final fade
	finalFadeEase: 'power3.out',
});
```

## Complete Example

Here's a full example using it in a React component:

```tsx
'use client';

import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import SplitText from 'gsap/SplitText';
import { animateNeonFlicker } from '@utils/animateNeonFlicker';

const MyComponent = ({ isActive, text }) => {
	const headingRef = useRef<HTMLHeadingElement>(null);
	const splitTextRef = useRef<SplitText | null>(null);

	useLayoutEffect(() => {
		if (!isActive || !headingRef.current) return;

		// Split text into characters
		splitTextRef.current = SplitText.create(headingRef.current, {
			type: 'chars',
			charsClass: 'char++',
		});

		// Set initial state
		gsap.set(splitTextRef.current.chars, { autoAlpha: 0 });
		gsap.set(headingRef.current, { autoAlpha: 1 });

		// Create timeline with delay
		const tl = gsap.timeline({ delay: 0.5 });

		// Animate with neon flicker
		animateNeonFlicker(splitTextRef.current.chars, tl);

		// Cleanup
		return () => {
			splitTextRef.current?.revert();
		};
	}, [isActive]);

	return <h1 ref={headingRef}>{text}</h1>;
};
```

## How It Works

1. **Random Delay**: Each element starts with a random delay (0 to `maxDelay` seconds) for staggered timing
2. **Random Flicker Count**: Each element flickers a random number of times (between `minFlickers` and `maxFlickers`)
3. **Rapid Flickers**: Each flicker is very quick (20-50ms by default) with random opacity
4. **Final Fade**: After flickering, each element smoothly fades to full opacity
5. **Individual Timelines**: Each element gets its own timeline, allowing independent animation

## Tips

- **For text**: Always use with SplitText to split into characters
- **For multiple headings**: Create separate timelines or use different `timelinePosition` values
- **Performance**: Works well with 50-100 elements, but test with your specific use case
- **Timing**: Adjust `maxDelay` to control how spread out the animation feels
- **Intensity**: Increase `maxFlickers` for more dramatic effect, decrease for subtler flicker

## Use Cases

- Text reveals in modals/dialogs
- Hero headings
- Loading states
- Error messages
- Special announcements
- Any dramatic text reveal
