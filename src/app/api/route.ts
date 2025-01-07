import { NextRequest, NextResponse } from "next/server";
import DBconnect from "../../../lib/db";
import Device from "../../../lib/Models/Product";

// Handle GET requests
export const GET = async () => {
  try {
    await DBconnect();

    const devices = await Device.find();
    return NextResponse.json(devices, { status: 200 });
  } catch (error) {
    console.error("Error fetching devices:", error);
    return NextResponse.json({ message: "Failed to fetch devices." }, { status: 500 });
  }
};

// Handle POST requests
export const POST = async (req: NextRequest) => {
  try {
    await DBconnect();

    const newDevice = await req.json();
    console.log("Device to save:", newDevice);

    const savedDevice = await Device.create(newDevice);
    return NextResponse.json({ message: "Device saved successfully", savedDevice }, { status: 201 });
  } catch (error: any) {
    console.error("Error saving device:", error.message);
    return NextResponse.json(
      { message: "Failed to save device.", error: error.message },
      { status: 500 }
    );
  }
};

// Handle PATCH requests
export const PATCH = async (req: NextRequest) => {
  try {
    await DBconnect();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Device ID is required" }, { status: 400 });
    }

    const updateData = await req.json();
    console.log("Device to update:", updateData);

    const updatedDevice = await Device.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedDevice) {
      return NextResponse.json({ error: "Device not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Device updated successfully", updatedDevice }, { status: 200 });
  } catch (error: any) {
    console.error("Error updating device:", error.message);
    return NextResponse.json({ message: "Failed to update device.", error: error.message }, { status: 500 });
  }
};

// Handle DELETE requests
export const DELETE = async (req: NextRequest) => {
  try {
    await DBconnect();

    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Device ID is required" }, { status: 400 });
    }

    const deletedDevice = await Device.findByIdAndDelete(id);

    if (!deletedDevice) {
      return NextResponse.json({ error: "Device not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Device deleted successfully", deletedDevice }, { status: 200 });
  } catch (error: any) {
    console.error("Error deleting device:", error.message);
    return NextResponse.json({ message: "Failed to delete device.", error: error.message }, { status: 500 });
  }
};
