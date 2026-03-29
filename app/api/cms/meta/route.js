import {
  getCmsMetaMerged,
  readRegistryRaw,
} from "../../../../lib/cms/buildCmsMeta";

/** مرجع للوحة التحرير + `registry` للعناصر المضافة يدوياً (قابلة للحذف) */
export async function GET() {
  return Response.json({
    ...getCmsMetaMerged(),
    registry: readRegistryRaw(),
  });
}
