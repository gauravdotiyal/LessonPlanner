import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const GeneratedOutput = ({generatedPlan}) => { 
  return (
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
      <p>{ generatedPlan.materials}</p>

      <div className="bg-indigo-500 text-white p-2 font-bold mt-4">Learning Objectives</div>
      <p>{generatedPlan.objectives}</p>

      <div className="bg-gray-800 text-white p-2 font-bold mt-4">Lesson Outline</div>
      <p>{generatedPlan.outline}</p>

      <div className="bg-indigo-500 text-white p-2 font-bold mt-4">Notes</div>
      <p>{generatedPlan.notes}</p> 
    </CardContent>
  </Card>
  )
}

export default GeneratedOutput
