import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
const API_KEY=import.meta.env.VITE_GEMINI_API_KEY 

const LessonPlanner = () => {
  const [formData, setFormData] = useState({
    topic: '',
    date: '',
    subject: '',
    gradeLevel: '',
    mainConcept: '',
    subtopics: '',
    materials: '',
    objectives: '',
    outline: '',
    notes: ''
  });

  const [generatedPlan, setGeneratedPlan] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
   

   

  const handleGeneratePlan = async () => {
    const prompt = `
      Create a detailed lesson plan based on the following:
      Topic: ${formData.topic}
      Date: ${formData.date}
      Subject: ${formData.subject}
      Grade Level: ${formData.gradeLevel}
      Main Concept: ${formData.mainConcept}
      Subtopics: ${formData.subtopics}
      Materials Needed: ${formData.materials}
      Learning Objectives: ${formData.objectives}
      Lesson Outline: ${formData.outline}
      Notes: ${formData.notes}
    `;
  
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }]
            }
          ]
        })
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error:", errorData);
        return;
      }
  
      const data = await response.json();
      console.log(data);
      setGeneratedPlan({
        topic: formData.topic,
        date: formData.date,
        subject: formData.subject,
        gradeLevel: formData.gradeLevel,
        mainConcept: formData.mainConcept,
        subtopics: formData.subtopics,
        materials: formData.materials,
        objectives: formData.objectives,
        outline: formData.outline,
        notes: formData.notes,
        generatedContent: data.candidates?.[0]?.content?.parts?.[0]?.text || "No content generated"
      });
  
    } catch (error) {
      console.error("Fetch Error:", error);
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
          <Input name="gradeLevel" placeholder="Grade Level" onChange={handleChange} />
          <Input name="mainConcept" placeholder="Main Concept" onChange={handleChange} />
          <Input name="subtopics" placeholder="Subtopics" onChange={handleChange} />
          <Textarea name="materials" placeholder="Materials Needed" onChange={handleChange} />
          <Textarea name="objectives" placeholder="Learning Objectives" onChange={handleChange} />
          <Textarea name="outline" placeholder="Lesson Outline" onChange={handleChange} />
          <Textarea name="notes" placeholder="Notes" onChange={handleChange} />
        </CardContent>
        <CardFooter>
          <Button onClick={handleGeneratePlan}>Generate Lesson Plan</Button>
        </CardFooter>
      </Card>

      {generatedPlan && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Topic: {generatedPlan.topic}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-indigo-500 text-white p-2 font-bold">Summary</div>
            <div className="grid grid-cols-2 gap-2">
              <div><strong>Date:</strong> {generatedPlan.date}</div>
              <div><strong>Subject:</strong> {generatedPlan.subject}</div>
              <div><strong>Year Group or Grade Level:</strong> {generatedPlan.gradeLevel}</div>
              <div><strong>Main Topic or Unit:</strong> {generatedPlan.mainConcept}</div>
              <div><strong>Subtopics or Key Concepts:</strong> {generatedPlan.subtopics}</div>
            </div>

            <div className="bg-gray-800 text-white p-2 font-bold mt-4">Materials Needed</div>
            <p>{generatedPlan.materials}</p>

            <div className="bg-indigo-500 text-white p-2 font-bold mt-4">Learning Objectives</div>
            <p>{generatedPlan.objectives}</p>

            <div className="bg-gray-800 text-white p-2 font-bold mt-4">Lesson Outline</div>
            <p>{generatedPlan.outline}</p>

            <div className="bg-indigo-500 text-white p-2 font-bold mt-4">Notes</div>
            <p>{generatedPlan.notes}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LessonPlanner;
