import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

interface WishRecord {
  id: string;
  createdAt: string;
  type: "audio" | "text";
  audioUrl?: string;
  text?: string;
  duration?: number;
}

const DATA_FILE = path.join(process.cwd(), "data", "wishes.json");
const RECORDINGS_DIR = path.join(process.cwd(), "public", "recordings");

async function ensureDataFile(): Promise<WishRecord[]> {
  try {
    const data = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify([]), "utf-8");
    return [];
  }
}

export async function GET() {
  try {
    const wishes = await ensureDataFile();
    return NextResponse.json({ success: true, wishes });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to load wishes";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await fs.mkdir(RECORDINGS_DIR, { recursive: true });
    const wishes = await ensureDataFile();

    const contentType = req.headers.get("content-type") || "";
    const id = `wish_${Date.now()}`;
    const createdAt = new Date().toISOString();

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const audioFile = formData.get("audio") as File | null;
      const text = (formData.get("text") as string) || "";
      const duration = Number(formData.get("duration") || 0);

      let audioUrl = "";

      if (audioFile) {
        const bytes = await audioFile.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const fileName = `${id}.webm`;
        const filePath = path.join(RECORDINGS_DIR, fileName);
        await fs.writeFile(filePath, buffer);
        audioUrl = `/recordings/${fileName}`;
      }

      const newWish: WishRecord = {
        id,
        createdAt,
        type: audioUrl ? "audio" : "text",
        audioUrl: audioUrl || undefined,
        text: text || undefined,
        duration: duration || undefined,
      };

      wishes.unshift(newWish);
      await fs.writeFile(DATA_FILE, JSON.stringify(wishes, null, 2), "utf-8");

      return NextResponse.json({ success: true, wish: newWish });
    } else {
      // JSON payload
      const body = await req.json();
      const newWish: WishRecord = {
        id,
        createdAt,
        type: body.audioBase64 ? "audio" : "text",
        text: body.text || undefined,
        duration: body.duration || undefined,
      };

      if (body.audioBase64) {
        const buffer = Buffer.from(body.audioBase64, "base64");
        const fileName = `${id}.webm`;
        const filePath = path.join(RECORDINGS_DIR, fileName);
        await fs.writeFile(filePath, buffer);
        newWish.audioUrl = `/recordings/${fileName}`;
      }

      wishes.unshift(newWish);
      await fs.writeFile(DATA_FILE, JSON.stringify(wishes, null, 2), "utf-8");

      return NextResponse.json({ success: true, wish: newWish });
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to save wish";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, error: "Missing ID" }, { status: 400 });
    }

    const wishes = await ensureDataFile();
    const wishToDelete = wishes.find((w) => w.id === id);

    if (wishToDelete?.audioUrl) {
      const fileName = path.basename(wishToDelete.audioUrl);
      const filePath = path.join(RECORDINGS_DIR, fileName);
      try {
        await fs.unlink(filePath);
      } catch {
        // ignore if already gone
      }
    }

    const updated = wishes.filter((w) => w.id !== id);
    await fs.writeFile(DATA_FILE, JSON.stringify(updated, null, 2), "utf-8");

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to delete wish";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
