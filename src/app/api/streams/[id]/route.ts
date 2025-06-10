import { NextRequest, NextResponse } from "next/server";
import { deleteStream, fetchStreamById, updateStream } from "@/actions/streamActions";

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
   const stream = await fetchStreamById(params.id)
   return NextResponse.json(stream);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
   const updates = await req.json();
   const updated = await updateStream(params.id, updates);
   return NextResponse.json(updated);
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
   await deleteStream(params.id);
   return NextResponse({ deleted: true });
}