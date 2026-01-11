'use client';

// Imports
// ------------

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomEase } from 'gsap/CustomEase';
import { Observer } from 'gsap/Observer';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';

gsap.registerPlugin(
	ScrollTrigger,
	useGSAP,
	CustomEase,
	Observer,
	Draggable,
	InertiaPlugin
);
