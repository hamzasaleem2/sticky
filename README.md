# sticky
Ideas that Stick, literally

![Sticky Logo](https://github.com/hamzasaleem2/sticky/blob/main/public/sticky-logo.png)

## About Sticky

Sticky is a digital sticky note application designed to help you organize your thoughts, ideas, and tasks in a visual and intuitive way. Organize thoughts, collaborate in real-time, and access your ideas from anywhere. Try it free today!

![Board](https://github.com/hamzasaleem2/sticky/blob/main/public/board.png)

### Key Features:

- Create and organize digital sticky notes
- Collaborate with others in real-time
- Customize note colors and sizes
- Drag and drop interface for easy organization
- Cloud sync across devices
- User-friendly and intuitive design

Sticky is perfect for brainstorming sessions, project planning, or simply keeping track of your daily tasks. Whether you're a student, professional, or creative thinker, Sticky helps you capture and organize your ideas effortlessly.

## Getting Started

To get started with Sticky, visit our website at [https://sticky.today](https://sticky.today) and sign up for a free account. You can start creating and organizing your sticky notes right away!

# **Sticky: Self-Hosting Guide**

https://sticky.today

## **Introduction**

Sticky is an open-source digital sticky note application designed to help users organize thoughts, collaborate in real-time, and access ideas from anywhere. This guide will walk you through the process of self-hosting Sticky on your own infrastructure.

## **Prerequisites**

Before you begin, ensure you have the following:

- Node.js (version 14 or higher) & npm (Node Package Manager) / Bun (better)
- Git
- A [Convex](https://Convex.dev) account (for database and backend services)
- A [Clerk](https://clerk.com) account (for authentication)
- A [PostHog](https://posthog.com) account (for analytics, optional)

## **Step 1: Clone the Repository**

First, clone the Sticky repository to your local machine:

git clone https://github.com/hamzasaleem2/sticky.git

cd sticky

## **Step 2: Install Dependencies**

Install the project dependencies using npm:

npm install

## **Step 3: Set Up Environment Variables**

Create a .env file in the root directory of the project. Use the .template.env file as a reference:

# Deployment used by `npx convex dev`

CONVEX_DEPLOYMENT=

VITE_CONVEX_URL=

VITE_CLERK_PUBLISHABLE_KEY=

VITE_POSTHOG_KEY=

VITE_POSTHOG_API_HOST=

Fill in the following environment variables:

- CONVEX_DEPLOYMENT: Your Convex deployment URL
- VITE_CONVEX_URL: Your Convex URL for client-side usage
- VITE_CLERK_PUBLISHABLE_KEY: Your Clerk publishable key
- VITE_POSTHOG_KEY: Your PostHog API key (optional)
- VITE_POSTHOG_API_HOST: Your PostHog API host (optional)

## **Step 4: Configure Convex**

- Set up a Convex account and create a new project.
- Copy the Convex deployment URL and paste it into your .env file.
- Update the convex/auth.config.ts file with your Clerk domain:

`export default {`

`providers: [`

`{`

`domain: process.env.CLERK_JWT_ISSUER_DOMAIN,`

`applicationID: "convex",`

`},`

`]`

`};`

Replace process.env.CLERK_JWT_ISSUER_DOMAIN with your actual Clerk domain.

## **Step 5: Configure Clerk**

- Set up a Clerk account and create a new application.
- Copy the Clerk publishable key and paste it into your .env file.
- Configure Clerk to use Convex as a JWT template.

## **Step 6: Deploy Convex Functions**

Deploy your Convex functions to make them available:

npx convex dev

This command will push your functions to the Convex cloud and keep them in sync as you make changes.

## **Step 8: Build the Frontend**

Build the frontend application:

npm run build

This command will create a production-ready build in the dist directory.

## **Step 9: Serve the Application**

You can serve the built application using a static file server. For example, using serve:

npx serve -s dist

## **Additional Configuration**

### **PostHog Analytics (Optional)**

If you want to use PostHog for analytics, make sure to set the VITE_POSTHOG_KEY and VITE_POSTHOG_API_HOST in your .env file.

### **Customization**

You can customize the application by modifying the following files:

- src/components/lander: Landing page components
- src/authenticated: Main application components
- src/components/ui: Reusable UI components

### **Scaling Considerations**

As your user base grows, consider the following:

- Monitor your Convex usage and upgrade your plan if necessary.
- Optimize database queries and indexes for better performance.
- Implement caching mechanisms for frequently accessed data.

## **Troubleshooting**

If you encounter issues:

- Check the browser console for frontend errors.
- Review Convex logs for backend errors.
- Ensure all environment variables are correctly set.
- Verify that your Clerk and Convex configurations are correct.

## Open Source

Sticky is an open-source project. We believe in transparency and community-driven development. Feel free to contribute to our GitHub repository:

[https://github.com/hamzasaleem2/sticky](https://github.com/hamzasaleem2/sticky)

## Star History

<a href="https://star-history.com/#hamzasaleem2/sticky&Date">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=hamzasaleem2/sticky&type=Date&theme=dark" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=hamzasaleem2/sticky&type=Date" />
   <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=hamzasaleem2/sticky&type=Date" />
 </picture>
</a>

## License

Sticky is released under the MIT License. See the LICENSE file for more details.
