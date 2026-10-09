import { NextResponse } from "next/server";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const clean = (value: unknown, max = 500) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const enquiry = {
      name: clean(body.name, 120),
      company: clean(body.company, 160),
      email: clean(body.email, 200),
      phone: clean(body.phone, 40),
      projectType: clean(body.projectType, 60),
      projectStage: clean(body.projectStage, 60),
      units: clean(body.units, 10),
      services: Array.isArray(body.services)
        ? body.services.map((s: unknown) => clean(s, 60)).filter(Boolean).slice(0, 10)
        : [],
      message: clean(body.message, 5000),
    };

    if (
      !enquiry.name ||
      !enquiry.company ||
      !enquiry.email ||
      !enquiry.projectType ||
      !enquiry.projectStage
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Please complete all required fields.",
        },
        { status: 400 }
      );
    }

    if (!EMAIL_PATTERN.test(enquiry.email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid email address.",
        },
        { status: 400 }
      );
    }

    console.log("PropTwin enquiry received:", enquiry);

    return NextResponse.json({
      success: true,
      message: "Enquiry submitted successfully.",
    });
  } catch (error) {
    console.error("Contact form error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. Please try again.",
      },
      { status: 500 }
    );
  }
}
