import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import GeneratedOutput from "./GeneratedOutput";
import { useNavigate } from "react-router-dom";
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const LessonPlanner = () => {
  const [formData, setFormData] = useState({
    topic: "",
    date: "",
    subject: "",
    gradeLevel: "",
    mainConcept: "",
    subtopics: "",
    materials: "",
    objectives: "",
    outline: "",
    notes: "",
  });

  const [generatedPlan, setGeneratedPlan] = useState(null);
  const navigate=useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleGeneratePlan = async () => {
    const fieldsToGenerate = ["materials", "objectives", "outline", "notes"];
    const generatedContent = {};

    for (const field of fieldsToGenerate) {
      const prompt = `Generate content for ${field} based on the topic: ${formData.topic}, subject: ${formData.subject}, and grade level: ${formData.gradeLevel}.`;

      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                {
                  parts: [{ text: prompt }],
                },
              ],
            }),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          console.error("API Error:", errorData);
          generatedContent[field] = "Error generating content.";
        } else {
          const data = await response.json();
          const rawContent =
            data.candidates?.[0]?.content?.parts?.[0]?.text ||
            "No content generated";

          // Format the generated content
          const formattedContent = await formatContent(rawContent);
          generatedContent[field] = formattedContent;
        }
      } catch (error) {
        console.error("Fetch Error:", error);
        generatedContent[field] = "Error generating content.";
      }
    }

    setGeneratedPlan({
      ...formData,
      ...generatedContent,
    });
  };

  const formatContent = async (plan) => {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `Format the following lesson plan content into a well-structured format with headings, bullet points, and proper indentation:\n\n${plan}`,
                  },
                ],
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error:", errorData);
        return "Error generating formatted content.";
      } else {
        const data = await response.json();
        // console.log(data.candidates?.[0]?.content?.parts?.[0]?.text);
        return (
          data.candidates?.[0]?.content?.parts?.[0]?.text ||
          "No formatted content generated"
        );
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      return "Error generating formatted content.";
    }
  };

  return (
    <div className="p-8 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Lesson Plan Form</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input name="topic" placeholder="Topic" onChange={handleChange} />
          <Input name="date" placeholder="Date" onChange={handleChange} />
          <Input name="subject" placeholder="Subject" onChange={handleChange} />
          <Input
            name="gradeLevel"
            placeholder="Grade Level"
            onChange={handleChange}
          />
          <Input
            name="mainConcept"
            placeholder="Main Concept"
            onChange={handleChange}
          />
          <Input
            name="subtopics"
            placeholder="Subtopics"
            onChange={handleChange}
          />
          <Textarea
            name="materials"
            placeholder="Materials Needed"
            onChange={handleChange}
          />
          <Textarea
            name="objectives"
            placeholder="Learning Objectives"
            onChange={handleChange}
          />
          <Textarea
            name="outline"
            placeholder="Lesson Outline"
            onChange={handleChange}
          />
          <Textarea name="notes" placeholder="Notes" onChange={handleChange} />
        </CardContent>
        <CardFooter>
          <Button onClick={handleGeneratePlan}>Generate Lesson Plan</Button>
        </CardFooter>
      </Card>

      {generatedPlan && <GeneratedOutput generatedPlan={generatedPlan} />}
    </div>
  );
};

export default LessonPlanner;
