'use server';

import { GoogleGenerativeAI } from "@google/generative-ai";
import dbConnect from "@/lib/mongodb";
import DNAFeedback from "@/models/DNAFeedback";
import DNAStat from "@/models/DNAStat";

interface DNAFormData {
  idea: string;
  targetUsers: string;
  problem: string;
  features: string;
  industry: string;
}

export async function analyzeStartupDNA(formData: DNAFormData) {
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured in environment variables.");
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `
    You are the Vybex DNA Intelligence Engine, a premium AI-powered startup analyzer.
    Analyze the following startup idea and generate a detailed DNA report in JSON format.
    BE BRUTALLY HONEST. Do not give high scores if they are not deserved. Provide balanced, realistic outputs.

    STARTUP DATA:
    - Idea: ${formData.idea}
    - Target Users: ${formData.targetUsers}
    - Problem: ${formData.problem}
    - Features: ${formData.features}
    - Industry: ${formData.industry}

    The JSON response MUST strictly follow this structure:
    {
      "summary": "AI-generated short summary of the startup idea (string)",
      "dnaScore": (number from 0-100, overall startup strength),
      "ideaClarity": (number from 0-100, how well-defined is the concept),
      "marketScore": (number from 1-10),
      "complexity": "Low" | "Medium" | "High",
      "riskFactors": ["risk1", "risk2", ...],
      "techStack": {
        "frontend": "string",
        "backend": "string",
        "database": "string",
        "ai": "string (optional)"
      },
      "mvpTime": "string (e.g. 3-4 weeks)",
      "mvpFeatures": ["feature1", "feature2", ...],
      "monetization": ["model1", "model2", ...],
      "competition": {
        "analysis": "Quick summary of competition landscape",
        "direct": ["competitor1", "competitor2", ...],
        "indirect": ["competitor3", "competitor4", ...],
        "saturation": "Low" | "Medium" | "High"
      },
      "growth": ["strategy1", "strategy2", ...],
      "genome": {
        "marketStrength": (number 1-100),
        "innovation": (number 1-100),
        "scalability": (number 1-100),
        "competition": (number 1-100),
        "monetization": (number 1-100)
      },
      "futureInsights": {
        "trendScore": (number 1-100),
        "opportunities": ["opp1", "opp2", ...],
        "evolution": "Future product evolution prediction string"
      }
    }

    Return ONLY the JSON object. Do not include markdown code blocks or any other text.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    const jsonString = text.replace(/```json/g, "").replace(/```/g, "").trim();
    
    // Increment total analyzed stats asynchronously (we don't await/block the return)
    dbConnect().then(async () => {
      let stat = await DNAStat.findOne({});
      if (!stat) {
        stat = new DNAStat({ totalAnalyzed: 0 });
      }
      stat.totalAnalyzed += 1;
      await stat.save();
    }).catch(console.error);

    return { success: true, data: JSON.parse(jsonString) };
  } catch (error: any) {
    console.error("Gemini Analysis Error:", error);
    
    // Detect Quota/429 errors
    const errorMessage = error?.message || "";
    if (errorMessage.includes("429") || errorMessage.toLowerCase().includes("quota") || errorMessage.toLowerCase().includes("limit")) {
      return { success: false, error: 'QUOTA_EXCEEDED' };
    }

    return { success: false, error: 'GENERAL_ERROR' };
  }
}

export async function submitDNAFeedback(data: { name: string, email: string, profession: string, experience: string, rating: number, improvedIdea: boolean }) {
  try {
    await dbConnect();
    const newFeedback = new DNAFeedback(data);
    await newFeedback.save();
    return { success: true };
  } catch (error) {
    console.error("Failed to submit DNA Feedback:", error);
    return { success: false, error: "Failed to submit feedback" };
  }
}

export async function getDNAStats() {
  try {
    await dbConnect();
    const feedbackCount = await DNAFeedback.countDocuments();
    
    // Calculate improved idea percentage
    const improvedCount = await DNAFeedback.countDocuments({ improvedIdea: true });
    
    let stat = await DNAStat.findOne({});
    let totalAnalyzed = stat ? stat.totalAnalyzed : 0;

    let improvedPercentage = 0;
    if (feedbackCount > 0) {
      improvedPercentage = Math.round((improvedCount / feedbackCount) * 100);
    }
    
    const foundersTrusted = feedbackCount;

    // Fetch top recent testimonials (rating 4 or 5 that have an experience message)
    const testimonialsDocs = await DNAFeedback.find({ 
      rating: { $gte: 4 }, 
      experience: { $ne: '' } 
    }).sort({ createdAt: -1 }).limit(3).lean();

    const testimonials = testimonialsDocs.map(doc => ({
      name: doc.name,
      profession: doc.profession,
      experience: doc.experience,
      rating: doc.rating,
      id: doc._id.toString()
    }));

    return {
      success: true,
      stats: {
        foundersTrusted,
        totalAnalyzed,
        improvedPercentage
      },
      testimonials
    };
  } catch (error) {
    console.error("Failed to get DNA Stats:", error);
    return { 
      success: true,
      stats: {
        foundersTrusted: 0,
        totalAnalyzed: 0,
        improvedPercentage: 0
      },
      testimonials: []
    };
  }
}
