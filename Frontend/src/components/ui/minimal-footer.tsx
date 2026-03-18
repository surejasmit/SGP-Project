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
		{ title: 'About Us', href: '/about' },
		{ title: 'Our Mission', href: '#' },
		{ title: 'Team', href: '#' },
		{ title: 'Privacy Policy', href: '#' },
		{ title: 'Terms of Service', href: '#' },
	];

	const resources = [
		{ title: 'Documentation', href: '#' },
		{ title: 'Help Center', href: '/help' },
		{ title: 'Support', href: '#' },
		{ title: 'Contact Us', href: '#' },
		{ title: 'FAQs', href: '/help' },
	];

	const socialLinks = [
		{ icon: <Facebook className="size-4" />, link: '#' },
		{ icon: <Github className="size-4" />, link: '#' },
		{ icon: <Instagram className="size-4" />, link: '#' },
		{ icon: <Linkedin className="size-4" />, link: '#' },
		{ icon: <Twitter className="size-4" />, link: '#' },
		{ icon: <Youtube className="size-4" />, link: '#' },
	];

	return (
		<footer className="bg-foreground text-background">
			<div className="mx-auto max-w-4xl border-x border-background/10">
				<div className="border-b border-background/10" />
				<div className="grid max-w-4xl grid-cols-6 gap-6 p-6">
					<div className="col-span-6 flex flex-col gap-5 md:col-span-4">
						<a href="#" className="w-max">
							<h2 className="text-2xl font-bold text-background">Smart Classroom</h2>
						</a>
						<p className="text-background/60 max-w-sm font-mono text-sm text-balance">
							Innovative system empowering educational institutions with seamless equipment management and issue tracking.
						</p>
						<div className="text-background/60 text-sm space-y-1">
							<p>📧 Email: smitsureja472007@gmail.com</p>
							<p>📞 Phone: +91 8160041789</p>
						</div>
						<div className="flex gap-2">
							{socialLinks.map((item, i) => (
								<a
									key={i}
									className="rounded-md border border-background/20 bg-background/10 p-1.5 text-background/80 transition-colors hover:bg-background/20 hover:text-background"
									target="_blank"
									href={item.link}
								>
									{item.icon}
								</a>
							))}
						</div>
					</div>
					<div className="col-span-3 w-full md:col-span-1">
						<span className="text-background/60 mb-1 text-xs font-semibold uppercase tracking-widest">
							Resources
						</span>
						<div className="flex flex-col gap-1">
							{resources.map(({ href, title }, i) => (
								<a
									key={i}
									className="w-max py-1 text-sm text-background/60 duration-200 hover:text-background hover:underline"
									href={href}
								>
									{title}
								</a>
							))}
						</div>
					</div>
					<div className="col-span-3 w-full md:col-span-1">
						<span className="text-background/60 mb-1 text-xs font-semibold uppercase tracking-widest">Company</span>
						<div className="flex flex-col gap-1">
							{company.map(({ href, title }, i) => (
								<a
									key={i}
									className="w-max py-1 text-sm text-background/60 duration-200 hover:text-background hover:underline"
									href={href}
								>
									{title}
								</a>
							))}
						</div>
					</div>
				</div>
				<div className="border-t border-background/10" />
				<div className="flex max-w-4xl flex-col justify-between gap-2 pt-2 pb-5 px-6">
					<p className="text-background/60 text-center text-sm">
						© {year} Smart Classroom Management. All rights reserved. Powered by SGP
					</p>
					<p className="text-background/40 text-center text-xs">
						Contact: <a href="mailto:vrajsutariya2402@gmail.com" className="hover:text-background transition-colors">vrajsutariya2402@gmail.com</a> | <a href="tel:+919870040658" className="hover:text-background transition-colors">+91 9870040658</a>
					</p>
				</div>
			</div>
		</footer>
	);
}
