"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { signIn } from "@/lib/auth-client";
import { toast } from "sonner";

export default function SignIn() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-lg md:text-xl">Password Sign In</CardTitle>
				<CardDescription className="text-xs md:text-sm">
					Enter your email below to login to your account
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="grid gap-4">
					<div className="grid gap-2">
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							type="email"
							placeholder="example@ddsb.ca"
							autoComplete="off"
							required
							onChange={(e) => {
								setEmail(e.target.value);
							}}
							value={email}
						/>
					</div>
					<div className="grid gap-2">
						<div className="flex items-center">
							<Label htmlFor="password">Password</Label>
						</div>
						<Input
							id="password"
							type="password"
							placeholder="password"
							autoComplete="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<Button
						type="submit"
						className="w-full"
						disabled={loading}
						onClick={async () => {
							await signIn.email(
								{
									email,
									password,
									callbackURL: "/dashboard"
								},
								{
									onRequest: () => {
										setLoading(true);
									},
									onResponse: () => {
										setLoading(false);
									},
									onError: (ctx) => {
										toast.error(ctx.error.message);
									}
								},
							);
						}}
					>
						{loading ? (
							<Loader2 size={16} className="animate-spin" />
						) : (
							<p> Login </p>
						)}
					</Button>
				</div>
			</CardContent>
			<CardFooter className="text-muted-foreground text-sm">
				If you are not a member of staff, please login using a &quot;Magic Link&quot;
			</CardFooter>
		</Card>
	);
}