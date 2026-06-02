import { redirect } from 'next/navigation'

// TODO(IA): the root is a placeholder redirect to /satire. The front page /
// section index is blocked on an unresolved information-architecture decision
// (one NexVigilant site with three sections vs. three imprints under The
// Vigilant Press — SPEC-001 §9.3, house name undecided). Do not build it until
// that ruling lands; ModeNav placement is tied to the same decision.
export default function Home() {
  redirect('/satire')
}
