import React, { useRef } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Download } from "lucide-react";

const GeneratedOutput = ({ generatedPlan = {} }) => {
  const contentRef = useRef();

  const {
    topic = "Untitled Topic",
    date = "",
    subject = "",
    gradeLevel = "",
    mainConcept = "",
    subtopics = "",
    materials = "",
    objectives = "",
    outline = "",
    notes = "",
  } = generatedPlan;

  const cleanContent = (text) => {
    if (!text) return "";
    return text.replace(/^[*\-.\d\s]+/, "").trim();
  };

  const handleDownload = () => {
    const content = contentRef.current;
    const htmlContent = `
      <html>
        <head>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
              padding: 20px;
              max-width: 800px;
              margin: 0 auto;
              background-color: #f8f9fa;
            }
            .card {
              background: white;
              border-radius: 8px;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
              padding: 24px;
              margin: 24px 0;
            }
            .card-header {
              margin-bottom: 24px;
            }
            .card-title {
              font-size: 24px;
              font-weight: bold;
              color: #1a1a1a;
              margin: 0;
            }
            .section-header {
              background: #4F46E5;
              color: white;
              padding: 12px 16px;
              border-radius: 6px;
              font-weight: bold;
              margin: 16px 0;
            }
            .section-header.dark {
              background: #1F2937;
            }
            .grid-container {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 16px;
              margin: 16px 0;
            }
            .grid-item {
              background: #f3f4f6;
              padding: 12px;
              border-radius: 6px;
            }
            .content-section {
              background: #f3f4f6;
              padding: 16px;
              border-radius: 6px;
              margin: 16px 0;
            }
            .content-section p {
              margin: 8px 0;
            }
            strong {
              color: #4b5563;
            }
            .space-y {
              margin-top: 16px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              background: white;
              margin-top: 8px;
            }
            th, td {
              border: 1px solid #e5e7eb;
              padding: 12px;
              text-align: left;
            }
            th {
              background: #f3f4f6;
              font-weight: bold;
            }
            tr:nth-child(even) {
              background: #f9fafb;
            }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="card-header">
              <h1 class="card-title">Topic: ${topic}</h1>
            </div>
            
            <div class="section-header">Summary</div>
            <div class="grid-container">
              <div class="grid-item"><strong>Date:</strong> ${date}</div>
              <div class="grid-item"><strong>Subject:</strong> ${subject}</div>
              <div class="grid-item"><strong>Grade Level:</strong> ${gradeLevel}</div>
              <div class="grid-item"><strong>Main Concept:</strong> ${mainConcept}</div>
              <div class="grid-item" style="grid-column: 1 / -1"><strong>Subtopics:</strong> ${subtopics}</div>
            </div>

            <div class="section-header dark">Materials Needed</div>
            <div class="content-section">
              ${materials
                .split("\n")
                .filter(Boolean)
                .map((line) => `<p>${cleanContent(line)}</p>`)
                .join("")}
            </div>

            <div class="section-header">Learning Objectives</div>
            <div class="content-section">
              ${objectives
                .split("\n")
                .filter(Boolean)
                .map((line) => `<p>${cleanContent(line)}</p>`)
                .join("")}
            </div>

            <div class="section-header dark">Lesson Outline</div>
            <div class="content-section">
              <table>
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Activity</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  ${outline
                    .split("\n")
                    .filter(Boolean)
                    .map((line) => {
                      const parts = line.split("|").map((part) => part.trim());
                      return `
                      <tr>
                        <td>${parts[0] || ""}</td>
                        <td>${parts[1] || ""}</td>
                        <td>${parts[2] || ""}</td>
                      </tr>
                    `;
                    })
                    .join("")}
                </tbody>
              </table>
            </div>

            <div class="section-header">Notes</div>
            <div class="content-section">
              ${notes
                .split("\n")
                .filter(Boolean)
                .map((line) => `<p>${cleanContent(line)}</p>`)
                .join("")}
            </div>
          </div>
        </body>
      </html>
    `;

    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${topic}_LessonPlan.html`;
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="mt-6" ref={contentRef}>
      <CardHeader>
        <CardTitle>Topic: {topic}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-indigo-500 text-white p-2 font-bold">Summary</div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <strong>Date:</strong> {date}
          </div>
          <div>
            <strong>Subject:</strong> {subject}
          </div>
          <div>
            <strong>Grade Level:</strong> {gradeLevel}
          </div>
          <div>
            <strong>Main Concept:</strong> {mainConcept}
          </div>
          <div>
            <strong>Subtopics:</strong> {subtopics}
          </div>
        </div>

        <div className="bg-gray-800 text-white p-2 font-bold mt-4">
          Materials Needed
        </div>
        <div className="bg-gray-100 p-4 rounded-md">
          {materials
            .split("\n")
            .filter(Boolean)
            .map((line, index) => (
              <p key={index}>{cleanContent(line)}</p>
            ))}
        </div>

        <div className="bg-indigo-500 text-white p-2 font-bold mt-4">
          Learning Objectives
        </div>
        <div className="bg-gray-100 p-4 rounded-md">
          {objectives
            .split("\n")
            .filter(Boolean)
            .map((line, index) => (
              <p key={index}>{cleanContent(line)}</p>
            ))}
        </div>

        <div className="bg-gray-800 text-white p-2 font-bold mt-4">
          Lesson Outline
        </div>
        <div className="bg-gray-100 p-4 rounded-md">
          {outline
            .split("\n")
            .filter(Boolean)
            .map((line, index) => (
              <p key={index}>{cleanContent(line)}</p>
            ))}
        </div>

        <div className="bg-indigo-500 text-white p-2 font-bold mt-4">Notes</div>
        <div className="bg-gray-100 p-4 rounded-md">
          {notes
            .split("\n")
            .filter(Boolean)
            .map((line, index) => (
              <p key={index}>{cleanContent(line)}</p>
            ))}
        </div>

        <button
          onClick={handleDownload}
          className="mt-4 flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          <Download size={16} />
          Download Lesson Plan
        </button>
      </CardContent>
    </Card>
  );
};

export default GeneratedOutput;
