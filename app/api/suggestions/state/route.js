import { readDismissedKeys } from "../../../../lib/suggestions/dismissedStore";

export async function GET() {
  return Response.json({ dismissed: readDismissedKeys() });
}
