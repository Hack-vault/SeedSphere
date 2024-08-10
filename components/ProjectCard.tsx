"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { SquareArrowOutUpRight, Triangle } from "lucide-react";
import Link from "next/link";
import ThemeButton from "./Button";

export default function ProjectCard({ project }: { project: any }) {
	const [flipped, setFlipped] = useState(false);

	return (
		<Card
			key={project._id}
			className="w-full max-w-md h-fit min-h-[420px] min-w-[30rem]"
			onClick={() => {
				setFlipped(!flipped);
			}}
		>
			<>
				{!flipped && (
					<Image
						src={project.image || "/placeholder.jpg"}
						alt={project.name || "Project Image"}
						width="400"
						height="200"
						className="object-cover w-full rounded-t-lg"
						style={{
							aspectRatio: "400/200",
							objectFit: "cover",
						}}
					/>
				)}

				<CardContent className="p-4 space-y-2 border-t h-full">
					<div className="flex items-center justify-between">
						<h3 className="text-xl font-bold">{project.name}</h3>
						<Link href={`/explore/${project._id}`}>
							<SquareArrowOutUpRight className="w-4 h-4 text-theme-secondary" />
						</Link>
					</div>
					{!flipped ? (
						<>
							<p className="text-muted-foreground line-clamp-3 min-h-20">
								{project?.projectDescription}
							</p>
							<div className="flex items-center gap-2 text-sm text-muted-foreground">
								<Triangle className="w-4 h-4 fill-primary" />
								<span>1.2K</span>
								<Triangle className="w-4 h-4 fill-muted rotate-180" />
								<span>200</span>
							</div>
						</>
					) : (
						<div className="h-full flex flex-col justify-between text-center w-full gap-y-8">
							<div className="h-full grid grid-cols-2 gap-y-10 mt-10 mx-auto w-full">
								{["celo", "optimism", "base", "mode"].map(
									(network) => {
										// Calculate the total amount funded for the current network
										const totalFunded =
											project?.funders
												?.filter(
													(funder: any) =>
														funder.chain.toLowerCase() ===
														network
												)
												.reduce(
													(acc: any, funder: any) =>
														acc +
														funder.amountFunded,
													0
												) || 0;

										// Add the total funded amount to the initial project points (if any)
										const displayAmount =
											(project?.[network] || 0) +
											totalFunded;

										return (
											<div
												key={network}
												className="w-fit mx-auto flex flex-col gap-y-4"
											>
												<h3 className="text-xl text-center font-bold uppercase">
													{network}
												</h3>
												<p
													className={`mb-6 text-lg font-bold text-center`}
												>
													{displayAmount}
													<span className="text-lg">
														PTS
													</span>
												</p>
											</div>
										);
									}
								)}
							</div>
							<ThemeButton className="w-full rounded-md border-none bg-[#FFEF61] hover:bg-[#FFEF61]/90 text-theme-foreground/70 mt-auto">
								Fund Project
							</ThemeButton>
						</div>
					)}
				</CardContent>
			</>
		</Card>
	);
}
