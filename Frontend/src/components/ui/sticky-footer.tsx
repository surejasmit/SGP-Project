import React from 'react';
import { cn } from '@/lib/utils';
import { motion, useReducedMotion } from 'framer-motion';
import { Facebook, Instagram, Youtube, Linkedin } from 'lucide-react';

interface FooterLink {
	title: string;
	href: string;
}
interface FooterLinkGroup {
	label: string;
	links: FooterLink[];
}

type StickyFooterProps = React.ComponentProps<'footer'>;

export function StickyFooter({ className, ...props }: StickyFooterProps) {
	return (
		<footer
			className={cn('relative h-[720px] w-full z-10', className)}
			style={{ clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)' }}
			{...props}
		>
			<div className="fixed bottom-0 h-[720px] w-full z-10">
				<div className="sticky top-[calc(100vh-720px)] h-full overflow-y-auto">
					<div className="relative flex size-full flex-col justify-between gap-5 border-t border-blue-700 bg-gradient-to-br from-blue-900 via-blue-800 to-black px-4 py-8 md:px-12 z-10">
						<div className="mt-10 flex flex-col gap-8 md:flex-row xl:mt-0">
							<AnimatedContainer className="w-full max-w-sm min-w-2xs space-y-4">
								<h2 className="text-2xl font-bold text-white">Smart Classroom Management</h2>
								<p className="text-gray-300 mt-8 text-sm md:mt-0">
									Innovative system empowering educational institutions with seamless equipment management and issue tracking.
								</p>
								<div className="flex gap-2">
									{socialLinks.map((link) => (
										<a key={link.title} href={link.href} className="size-8 flex items-center justify-center rounded-md border border-blue-600 bg-blue-800/50 hover:bg-blue-700/50 transition-colors">
											<link.icon className="size-4 text-white" />
										</a>
									))}
								</div>
							</AnimatedContainer>
							{footerLinkGroups.map((group, index) => (
								<AnimatedContainer
									key={group.label}
									delay={0.1 + index * 0.1}
									className="w-full"
								>
									<div className="mb-10 md:mb-0">
										<h3 className="text-sm uppercase text-blue-200 font-semibold mb-4">{group.label}</h3>
										<ul className="text-gray-200 mt-4 space-y-2 text-sm md:text-xs lg:text-sm">
											{group.links.map((link) => (
												<li key={link.title}>
													<a
														href={link.href}
														className="hover:text-cyan-400 inline-flex items-center transition-all duration-300"
													>
														{link.title}
													</a>
												</li>
											))}
										</ul>
									</div>
								</AnimatedContainer>
							))}
						</div>
						<div className="text-gray-300 flex flex-col items-center justify-between gap-2 border-t border-blue-700 pt-2 text-sm md:flex-row">
							<p>© 2025 Smart Classroom Management. All rights reserved.</p>
							<p>Powered by SGP</p>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}

const socialLinks = [
	{ title: 'Facebook', href: '#', icon: Facebook },
	{ title: 'Instagram', href: '#', icon: Instagram },
	{ title: 'Youtube', href: '#', icon: Youtube },
	{ title: 'LinkedIn', href: '#', icon: Linkedin },
];

const footerLinkGroups: FooterLinkGroup[] = [
	{
		label: 'Features',
		links: [
			{ title: 'Classroom Management', href: '#' },
			{ title: 'Lab Management', href: '#' },
			{ title: 'Equipment Tracking', href: '#' },
			{ title: 'Issue Reporting', href: '#' },
			{ title: 'Real-time Monitoring', href: '#' },
			{ title: 'Complaint Dashboard', href: '#' },
			{ title: 'Maintenance Scheduling', href: '#' },
			{ title: 'Inventory Management', href: '#' },
			{ title: 'Status Tracking', href: '#' },
			{ title: 'Automated Notifications', href: '#' },
		],
	},
	{
		label: 'Equipment',
		links: [
			{ title: 'PC Management', href: '#' },
			{ title: 'Smart Board Tracking', href: '#' },
			{ title: 'Fan Monitoring', href: '#' },
			{ title: 'Projector Systems', href: '#' },
			{ title: 'Audio Equipment', href: '#' },
			{ title: 'Network Devices', href: '#' },
			{ title: 'Furniture Assets', href: '#' },
			{ title: 'Lab Instruments', href: '#' },
			{ title: 'Safety Equipment', href: '#' },
		],
	},
	{
		label: 'Locations',
		links: [
			{ title: 'Classroom 1-15', href: '/locations' },
			{ title: 'Lab 1-15', href: '/locations' },
			{ title: 'Computer Labs', href: '#' },
			{ title: 'Science Labs', href: '#' },
			{ title: 'Engineering Labs', href: '#' },
			{ title: 'Lecture Halls', href: '#' },
			{ title: 'Seminar Rooms', href: '#' },
			{ title: 'Library', href: '#' },
		],
	},
	{
		label: 'Services',
		links: [
			{ title: 'Issue Resolution', href: '#' },
			{ title: 'Preventive Maintenance', href: '#' },
			{ title: 'Emergency Support', href: '#' },
			{ title: 'Equipment Installation', href: '#' },
			{ title: 'Technical Support', href: '#' },
			{ title: 'System Upgrades', href: '#' },
			{ title: 'Training & Workshops', href: '#' },
			{ title: 'Consultation', href: '#' },
		],
	},
	{
		label: 'Resources',
		links: [
			{ title: 'User Guide', href: '#' },
			{ title: 'Documentation', href: '#' },
			{ title: 'Help Center', href: '#' },
			{ title: 'Video Tutorials', href: '#' },
			{ title: 'FAQs', href: '#' },
			{ title: 'Support', href: '#' },
			{ title: 'Contact Us', href: '#' },
			{ title: 'Report a Bug', href: '#' },
		],
	},
	{
		label: 'Company',
		links: [
			{ title: 'About Us', href: '#' },
			{ title: 'Our Mission', href: '#' },
			{ title: 'Team', href: '#' },
			{ title: 'Careers', href: '#' },
			{ title: 'Partners', href: '#' },
			{ title: 'Privacy Policy', href: '#' },
			{ title: 'Terms of Service', href: '#' },
			{ title: 'Cookie Policy', href: '#' },
		],
	},
];

type AnimatedContainerProps = React.ComponentProps<typeof motion.div> & {
	children?: React.ReactNode;
	delay?: number;
};

function AnimatedContainer({
	delay = 0.1,
	children,
	...props
}: AnimatedContainerProps) {
	const shouldReduceMotion = useReducedMotion();

	if (shouldReduceMotion) {
		return children;
	}

	return (
		<motion.div
			initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
			whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
			viewport={{ once: true }}
			transition={{ delay, duration: 0.8 }}
			{...props}
		>
			{children}
		</motion.div>
	);
}
