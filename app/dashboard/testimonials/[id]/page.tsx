/*
  Per-testimonial creative generation screen.

  Server entry: looks up the testimonial by id from the mock dataset
  and hands it to the client view. If the id is bogus we 404.
*/

import { notFound } from "next/navigation";
import { TESTIMONIALS } from "../../_data/testimonials";
import GenerateView from "./GenerateView";

export default async function TestimonialDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const testimonial = TESTIMONIALS.find((t) => t.id === id);
  if (!testimonial) notFound();
  return <GenerateView testimonial={testimonial} />;
}
