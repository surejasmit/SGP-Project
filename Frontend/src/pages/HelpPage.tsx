import { Timeline } from '@/components/ui/timeline';

export default function HelpPage() {
  const helpData = [
    {
      title: "Getting Started",
      content: (
        <div className="bg-white dark:bg-gray-800/30 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <div>
              <p className="font-semibold text-gray-900 dark:text-white mb-2">Q: How do I create an account?</p>
              <p>A: Click the "Signup" button in the navigation bar, fill in your name, email, and password, then click "Sign Up".</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900 dark:text-white mb-2">Q: How do I report an equipment issue?</p>
              <p>A: After logging in, click "Get Started" → Select "Classrooms" or "Labs" → Choose the room → Click on the affected equipment → Fill out the report form.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "For Users",
      content: (
        <div className="bg-white dark:bg-gray-800/30 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <div>
              <p className="font-semibold text-gray-900 dark:text-white mb-2">Q: How do I track my submitted queries?</p>
              <p>A: Click the "Dashboard" button in the navigation bar to view all your submitted queries and their current status.</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900 dark:text-white mb-2">Q: What do the different status colors mean?</p>
              <p>A: <span className="text-yellow-600 dark:text-yellow-400">Yellow (Pending)</span> - Query submitted, waiting for admin review. <span className="text-blue-600 dark:text-blue-400">Blue (In Progress)</span> - Admin is working on it. <span className="text-green-600 dark:text-green-400">Green (Resolved)</span> - Issue has been fixed.</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900 dark:text-white mb-2">Q: Can I submit multiple queries for the same equipment?</p>
              <p>A: No, you cannot submit a new query if the equipment already has an active (pending/in-progress) query. Wait until it's resolved.</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900 dark:text-white mb-2">Q: How do I know if admin responded to my query?</p>
              <p>A: Check your Dashboard - admin responses will appear in the "Admin Response" column.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "For Admins",
      content: (
        <div className="bg-white dark:bg-gray-800/30 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <div>
              <p className="font-semibold text-gray-900 dark:text-white mb-2">Q: How do I access the admin dashboard?</p>
              <p>A: Login with admin credentials (admin@sgp.com), then click "Dashboard" to view all submitted queries.</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900 dark:text-white mb-2">Q: How do I respond to a user's query?</p>
              <p>A: In the Admin Workplace, type your response in the "Response" text box for that query, then click "Solve" to mark it as resolved.</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900 dark:text-white mb-2">Q: Can I see which equipment items are affected?</p>
              <p>A: Yes, affected equipment items are marked with red cards in the classroom/lab views.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Equipment Status",
      content: (
        <div className="bg-white dark:bg-gray-800/30 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <div>
              <p className="font-semibold text-gray-900 dark:text-white mb-2">Q: What does a red equipment card mean?</p>
              <p>A: A red card indicates that the equipment has an active query (pending or in-progress). It means someone has already reported an issue with that item.</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900 dark:text-white mb-2">Q: When does the red card turn back to normal?</p>
              <p>A: The card returns to normal (gray) when the admin marks the query as "resolved".</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Technical Support",
      content: (
        <div className="bg-white dark:bg-gray-800/30 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <div>
              <p className="font-semibold text-gray-900 dark:text-white mb-2">Q: What equipment can I report issues for?</p>
              <p>A: You can report issues for PCs (in labs), Fans (in both classrooms and labs), and Smart Boards (in both classrooms and labs).</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900 dark:text-white mb-2">Q: How many classrooms and labs are available?</p>
              <p>A: The system manages 15 classrooms (301-315) and 15 computer labs (Lab 1-15).</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900 dark:text-white mb-2">Q: I forgot my password. What should I do?</p>
              <p>A: Currently, please contact the system administrator to reset your password.</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900 dark:text-white mb-2">Q: Is my data secure?</p>
              <p>A: Yes, all passwords are encrypted using bcrypt, and authentication uses JWT tokens. Your data is stored securely in MongoDB.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Contact Us",
      content: (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">📧 Still Need Help?</h3>
          <div className="space-y-3 text-gray-700 dark:text-gray-300">
            <p>If you have any questions or issues not covered here, please contact:</p>
            <p className="text-gray-900 dark:text-white font-semibold">📧 Email: support@smartclassroom.edu</p>
            <p className="text-gray-900 dark:text-white font-semibold">📞 Phone: +1 (555) 123-4567</p>
            <p className="text-gray-900 dark:text-white font-semibold">🕐 Support Hours: Monday - Friday, 9:00 AM - 5:00 PM</p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-black pt-20 px-4 pb-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent mb-4 text-center">
          Help Center
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-center mb-12">
          Find answers to common questions about our Smart Classroom & Lab Management System
        </p>

        <Timeline data={helpData} />
      </div>
    </div>
  );
}
