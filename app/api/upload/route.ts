import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        if (file.size > 10 * 1024 * 1024) {
            return NextResponse.json({ error: "File must be less than 10MB" }, { status: 400 });
        }

        const cloudName = process.env.CLOUDINARY_CLOUD_NAME!;
        const apiKey = process.env.CLOUDINARY_API_KEY!;
        const apiSecret = process.env.CLOUDINARY_API_SECRET!;

        const timestamp = Math.floor(Date.now() / 1000).toString();
        const folder = "zenith-coordinators";

        // Create signature
        const signatureStr = `folder=${folder}&timestamp=${timestamp}${apiSecret}`;
        const signature = crypto
            .createHash("sha1")
            .update(signatureStr)
            .digest("hex");

        const uploadData = new FormData();
        uploadData.append("file", file);
        uploadData.append("api_key", apiKey);
        uploadData.append("timestamp", timestamp);
        uploadData.append("signature", signature);
        uploadData.append("folder", folder);

        const res = await fetch(
            `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
            { method: "POST", body: uploadData }
        );

        if (!res.ok) {
            const errData = await res.json();
            console.error("Cloudinary error:", errData);
            return NextResponse.json(
                { error: errData.error?.message || "Upload failed" },
                { status: 500 }
            );
        }

        const data = await res.json();
        return NextResponse.json({ url: data.secure_url });
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }
}
