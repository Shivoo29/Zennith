"use client"

import { usePathname } from 'next/navigation'
import { ThreeBackground } from "./three-background"
import { PageBackground } from "./page-background"

export function BackgroundController() {
	const pathname = usePathname()
	
	const getBackgroundType = () => {
		switch (pathname) {
			case '/about':
				return 'about'
			case '/events':
				return 'events'
			case '/sponsors':
				return 'sponsors'
			case '/register':
				return 'register'
			default:
				return null
		}
	}

	return pathname === '/' ? (
		<ThreeBackground />
	) : (
		getBackgroundType() && <PageBackground type={getBackgroundType() as "about" | "events" | "sponsors" | "register"} />
	)
}