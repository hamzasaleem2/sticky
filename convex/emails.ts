"use node";

import { internalAction } from "./_generated/server";
import { v } from "convex/values";
import { Resend as ResendAPI } from "resend";
import { WelcomeEmail } from "./welcomeEmail";
import { internal } from "./_generated/api";

const resend = new ResendAPI(process.env.RESEND_API_KEY);

export const sendWelcomeEmail = internalAction({
    args: {
        userId: v.id("users"),
        email: v.string(),
        name: v.string()
    },
    handler: async (ctx, args) => {
        const { userId, email, name } = args;

        // Check if welcome email has already been sent
        const IsSent = await ctx.runQuery(internal.users.existingLogforEmail, { userId })

        if (IsSent) {
            return false;
        }

        try {
            await resend.emails.send({
                from: 'Sticky.today <welcome@sticky.today>',
                to: email,
                subject: 'Welcome to Sticky - Let\'s make your ideas stick!',
                react: WelcomeEmail({ name: name }),
                text: `
                    Welcome to Sticky, ${name}!

                    Ideas that stick, literally! 😉

                    You've just found the duct tape for your brain!

                    Get started: https://www.sticky.today/boards

                    Need help? Visit your Board and use the ? button to ask.

                    Best,
                    The Sticky team
                    `.trim()
            });


            // Log the sent email
            await ctx.runMutation(internal.users.LogEmailSend, {
                userId: userId,
                type: "welcome"
            })

        } catch (error) {
            console.error(`Failed to send welcome email to user ${userId}:`, error);
        }
    },
});