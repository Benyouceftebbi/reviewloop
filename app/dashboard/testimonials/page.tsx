/*
  Testimonials route — server component just renders the client view.
  The state for selected item, generation, brand template, etc. all
  lives in TestimonialsView.
*/

import TestimonialsView from "./TestimonialsView";
import { TESTIMONIALS } from "../_data/testimonials";

export default function TestimonialsPage() {
  return <TestimonialsView items={TESTIMONIALS} />;
}
