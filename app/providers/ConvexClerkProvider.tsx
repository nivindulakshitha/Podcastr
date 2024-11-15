"use client";
import { ReactNode } from "react";
import { ClerkProvider, useAuth } from "@clerk/clerk-react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL as string);

const ConvexClerkProvider = ({ children }: { children: ReactNode }) => (
	<ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY as string} appearance={{
		layout: { socialButtonsVariant: 'iconButton', logoImageUrl: '/icons/logo-auth.svg', },
		variables: {
			colorBackground: '#15171C',
			colorPrimary: '#F9F9F9',
			colorText: '#F9F9F9',
			colorInputBackground: '#1B1F29',
			colorInputText: '#F9F9F9',
		}
		

	}
	}>
		<ConvexProviderWithClerk client={convex} useAuth={useAuth}>
			{children}
		</ConvexProviderWithClerk>
	</ClerkProvider>
);

export default ConvexClerkProvider;