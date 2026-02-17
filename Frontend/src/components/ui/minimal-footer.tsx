import {
	Facebook,
	Github,
	Instagram,
	Linkedin,
	Twitter,
	Youtube,
} from 'lucide-react';

export function MinimalFooter() {
	const year = new Date().getFullYear();

	const company = [
		{
			title: 'About Us',
			href: '/about',
		},
		{
			title: 'Our Mission',
			href: '#',
		},
		{
			title: 'Team',
			href: '#',
		},
		{
			title: 'Privacy Policy',
			href: '#',
		},
		{
			title: 'Terms of Service',
			href: '#',
		},
	];

	const resources = [
		{
			title: 'Documentation',
			href: '#',
		},
		{
			title: 'Help Center',
			href: '#',
		},
		{
			title: 'Support',
			href: '#',
		},
		{
			title: 'Contact Us',
			href: '#',
		},
		{
			title: 'FAQs',
			href: '#',
		},
	];

	const socialLinks = [
		{
			icon: <Facebook className="size-4" />,
			link: '#',
		},
		{
			icon: <Github className="size-4" />,
			link: '#',
		},
		{
			icon: <Instagram className="size-4" />,
			link: '#',
		},
		{
			icon: <Linkedin className="size-4" />,
			link: '#',
		},
		{
			icon: <Twitter className="size-4" />,
			link: '#',
		},
		{
			icon: <Youtube className="size-4" />,
			link: '#',
		},
	];
	return (
		<footer className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-black">
			<div className="bg-[radial-gradient(35%_80%_at_30%_0%,rgba(59,130,246,0.2),transparent)] mx-auto max-w-4xl md:border-x border-blue-700">
				<div className="bg-blue-700 absolute inset-x-0 h-px w-full" />
				<div className="grid max-w-4xl grid-cols-6 gap-6 p-4">
					<div className="col-span-6 flex flex-col gap-5 md:col-span-4">
						<a href="#" className="w-max">
							<h2 className="text-2xl font-bold text-white">Smart Classroom</h2>
						</a>
						<p className="text-gray-300 max-w-sm font-mono text-sm text-balance">
							Innovative system empowering educational institutions with seamless equipment management and issue tracking.
						</p>
						<div className="text-gray-300 text-sm space-y-1">
							<p>📧 Email: smitsureja472007@gmail.com</p>
							<p>📞 Phone: +91 8160041789</p>
						</div>
						<div className="flex gap-2">
							{socialLinks.map((item, i) => (
								<a
									key={i}
									className="hover:bg-blue-700/50 rounded-md border border-blue-600 bg-blue-800/50 p-1.5 text-white transition-colors"
									target="_blank"
									href={item.link}
								>
									{item.icon}
								</a>
							))}
						</div>
					</div>
					<div className="col-span-3 w-full md:col-span-1">
						<span className="text-blue-200 mb-1 text-xs font-semibold uppercase">
							Resources
						</span>
						<div className="flex flex-col gap-1">
							{resources.map(({ href, title }, i) => (
								<a
									key={i}
									className={`w-max py-1 text-sm text-gray-200 duration-200 hover:text-cyan-400 hover:underline`}
									href={href}
								>
									{title}
								</a>
							))}
						</div>
					</div>
					<div className="col-span-3 w-full md:col-span-1">
						<span className="text-blue-200 mb-1 text-xs font-semibold uppercase">Company</span>
						<div className="flex flex-col gap-1">
							{company.map(({ href, title }, i) => (
								<a
									key={i}
									className={`w-max py-1 text-sm text-gray-200 duration-200 hover:text-cyan-400 hover:underline`}
									href={href}
								>
									{title}
								</a>
							))}
						</div>
					</div>
				</div>
				<div className="bg-blue-700 absolute inset-x-0 h-px w-full" />
				<div className="flex max-w-4xl flex-col justify-between gap-2 pt-2 pb-5">
					<p className="text-gray-300 text-center font-thin">
						© 2025 Smart Classroom Management. All rights reserved. Powered by SGP
					</p>
					<p className="text-gray-400 text-center text-sm">
						Contact: <a href="mailto:vrajsutariya2402@gmail.com" className="hover:text-cyan-400 transition-colors">vrajsutariya2402@gmail.com</a> | <a href="tel:+919870040658" className="hover:text-cyan-400 transition-colors">+91 9870040658</a>
					</p>
				</div>
			</div>
		</footer>
	);
}
