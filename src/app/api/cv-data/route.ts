import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "src/data/cv-data.json");

export async function GET() {
  try {
    // Try to read from JSON file first
    const data = await fs.readFile(DATA_FILE, "utf-8");
    return NextResponse.json(JSON.parse(data));
  } catch {
    // Fallback to TypeScript data file
    const { cvData } = await import("@/data/cv-data");
    return NextResponse.json(cvData);
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Save to JSON file
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving data:", error);
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}
